const ExcelJS = require('exceljs');
const { Op } = require('sequelize'); // Sequelize operators
const PDFDocument = require('pdfkit');

// Create a new record in the database
const createOne = async (Model, data) => {
    try {
        const doc = await Model.create(data);
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Read all records with pagination and filters
const readAll = async (Model, query = {}) => {
    try {
        const { page = 1, limit = 20, ...filters } = query;
        const skip = (page - 1) * limit;

        // Apply filters to the Sequelize query
        const docs = await Model.findAll({
            where: filters,
            offset: skip,
            limit: parseInt(limit, 10)
        });

        // Count total records
        const totalItems = await Model.count({
            where: filters
        });
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: docs,
            pagination: {
                totalItems,
                totalPages,
                currentPage: parseInt(page, 10),
                pageSize: parseInt(limit, 10)
            }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Export data to Excel
const readAllExcel = async (req, res) => {
    try {
        const { modelName, ...query } = req.query;

        // Validate and get the model from Sequelize models
        if (!Model[modelName]) {
            return res.status(400).json({ error: 'Invalid model name' });
        }

        const Model = require('../models')[modelName]; // Adjust according to your actual model path

        // Get the filtered data with pagination
        const { data, pagination } = await readAll(Model, query);

        // Create an Excel Workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Add columns to worksheet
        const columns = Object.keys(Model.rawAttributes)
            .filter(key => key !== 'id')
            .map(key => ({ header: key, key }));
        worksheet.columns = columns;

        // Add rows to worksheet
        data.forEach(item => {
            worksheet.addRow(item.toJSON());
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${modelName}.xlsx`);

        // Write to buffer and end response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error during export process:', error.stack);
        if (!res.headersSent) {
            res.status(500).json({ error: 'An error occurred during the export process', details: error.message });
        }
    }
};

// Export data to PDF
const readAllPDF = async (req, res) => {
    try {
        const { modelName, ...query } = req.query;

        if (!Model[modelName]) {
            return res.status(400).json({ error: 'Invalid model name' });
        }

        const Model = require('../models')[modelName];
        const { data } = await readAll(Model, query);

        const columns = Object.keys(Model.rawAttributes)
            .filter(key => key !== 'id');

        // Calculate the maximum width required for each column
        const columnWidths = columns.map(column => {
            const maxLength = Math.max(...data.map(item => (item[column] ? item[column].toString().length : 0)), column.length);
            return Math.min(maxLength * 7, 200); // Limit the max column width to 200 to avoid excessive width
        });

        const doc = new PDFDocument({ margin: 30 });
        let filename = `${modelName}.pdf`;
        filename = encodeURIComponent(filename);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        doc.pipe(res);

        doc.fontSize(18).text(`${modelName} Data`, { align: 'center' });

        const drawTable = (doc, columns, columnWidths, data) => {
            const tableTop = 100;
            const itemHeight = 20;
            const cellPadding = 5;
            const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            let x = 30;
            let y = tableTop;

            const drawRow = (rowData, y, isHeader = false) => {
                let rowHeight = itemHeight;

                // Calculate row height based on content
                rowData.forEach((cell, i) => {
                    const cellWidth = columnWidths[i];
                    const textHeight = doc.heightOfString(cell, { width: cellWidth - cellPadding * 2 });
                    rowHeight = Math.max(rowHeight, textHeight + cellPadding * 2);
                });

                rowData.forEach((cell, i) => {
                    const cellWidth = columnWidths[i];
                    if (isHeader) {
                        doc.fillColor('red').rect(x, y, cellWidth, rowHeight).stroke();
                        doc.fillColor('white').text(cell, x + cellPadding, y + cellPadding, {
                            width: cellWidth - cellPadding * 2,
                            align: 'left'
                        });
                    } else {
                        doc.fillColor('lightblue').rect(x, y, cellWidth, rowHeight).stroke();
                        doc.fillColor('black').text(cell, x + cellPadding, y + cellPadding, {
                            width: cellWidth - cellPadding * 2,
                            align: 'left'
                        });
                    }
                    x += cellWidth;
                });
                x = 30;

                return rowHeight;
            };

            doc.font('Helvetica-Bold').fontSize(12);
            let headerHeight = drawRow(columns, y, true);

            y += headerHeight;
            doc.font('Helvetica').fontSize(10);

            data.forEach((item) => {
                const rowData = columns.map(column => item[column] ? item[column].toString() : '');
                let rowHeight = drawRow(rowData, y);
                y += rowHeight;

                if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
                    doc.addPage();
                    y = tableTop;
                }
            });
        };

        drawTable(doc, columns, columnWidths, data);

        doc.end();
    } catch (error) {
        console.error('Error during export process:', error.stack);
        if (!res.headersSent) {
            res.status(500).json({ error: 'An error occurred during the export process', details: error.message });
        }
    }
};

// Find a document by ID
const readById = async (Model, id) => {
    try {
        const doc = await Model.findByPk(id);
        if (!doc) throw new Error('Document not found');
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a document by ID
const updateById = async (Model, id, data) => {
    try {
        // Perform the update operation
        const [affectedRows] = await Model.update(data, { where: { id } });

        // Check if any rows were affected
        if (affectedRows === 0) throw new Error('Document not found');

        // Fetch the updated record
        const updatedRecord = await Model.findByPk(id);
        if (!updatedRecord) throw new Error('Failed to retrieve updated document');

        return updatedRecord;
    } catch (error) {
        // Log and rethrow the error
        console.error('Error updating record:', error.message);
        throw new Error(error.message);
    }
};


// Delete a document by ID
const deleteById = async (Model, id) => {
    try {
        const doc = await readById(Model, id);
        await doc.destroy();
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Handler for creating a document
const handleCreate = (Model) => async (req, res) => {
    try {
        const doc = await createOne(Model, req.body);
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler for reading all documents
const handleReadAll = (Model) => {
    return async (req, res) => {
        try {
            // Log the received query parameters
            console.log('Received query parameters:', req.query);

            // Call readAll with the query parameters
            const result = await readAll(Model, req.query);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
};

// Handler for reading a document by ID
const handleReadById = (Model) => async (req, res) => {
    try {
        const doc = await readById(Model, req.params.id);
        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler for updating a document by ID
const handleUpdateById = (Model) => async (req, res) => {
    try {
        const doc = await updateById(Model, req.params.id, req.body);
        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler for deleting a document by ID
const handleDeleteById = (Model) => async (req, res) => {
    try {
        const doc = await deleteById(Model, req.params.id);
        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export functions
module.exports = {
    createOne,
    readAll,
    readAllExcel,
    readAllPDF,
    readById,
    updateById,
    deleteById,
    handleCreate,
    handleReadAll,
    handleReadById,
    handleUpdateById,
    handleDeleteById
};
