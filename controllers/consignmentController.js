
const Consignment = require('../models/Consignment');
const ConsignmentItem =  require('../models/ConsignmentItem');
const Document  = require('../models/Document');
const { createOne, updateById, readAll, deleteById } = require('../utils/functions');

// Create a consignment along with multiple items and multiple documents
const createConsignment = async (req, res) => {
    const { consignmentData, items, documents } = req.body;

    try {
        // Create consignment
        const consignment = await createOne(Consignment, consignmentData);

        // Create consignment items
        if (items && items.length > 0) {
            for (const item of items) {
                item.consignmentId = consignment.id;
                await createOne(ConsignmentItem, item);
            }
        }

        // Create documents
        if (documents && documents.length > 0) {
            for (const doc of documents) {
                doc.consignmentId = consignment.id;
                await createOne(Document, doc);
            }
        }

        res.status(201).json(consignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// read all the consignments
const readAllConsignments = async (req, res) => {
    try {
        const result = await readAll(Consignment, req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// read one by id
const readOneById = async (req, res) => {
    const consignmentId = parseInt(req.params.id);
  
    try {
      if (isNaN(consignmentId)) {
        return res.status(400).json({ error: 'Invalid consignment ID' });
      }
  
      // Fetch consignment data
      const consignment = await Consignment.findByPk(consignmentId);
  
      if (!consignment) {
        return res.status(404).json({ error: 'Consignment not found' });
      }
  
      // Fetch associated items
      const items = await ConsignmentItem.findAll({
        where: { consignmentId: consignmentId },
        attributes: ['itemId', 'unitsConsigned', 'unitsPending']
      });
  
      // Fetch associated documents
      const documents = await Document.findAll({
        where: { consignmentId: consignmentId },
        attributes: ['filePath', 'fileName', 'fileType', 'documentType']
      });
  
      // Prepare the response
      const response = {
        consignmentData: consignment.toJSON(),
        items: items.map(item => ({
          itemId: item.itemId,
          unitsConsigned: item.unitsConsigned,
          unitsPending: item.unitsPending
        })),
        documents: documents.map(doc => ({
          filePath: doc.filePath,
          fileName: doc.fileName,
          fileType: doc.fileType,
          documentType: doc.documentType
        }))
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching consignment:', error);
      res.status(500).json({ error: 'Error fetching consignment', issue: error.message });
    }
  };
// Update a consignment along with its items and documents
const updateConsignment = async (req, res) => {
    const passedId = req.params.id;
    const { consignmentData, items, documents } = req.body;

    try {
        // Update consignment
        const updatedConsignment = await updateById(Consignment, passedId, consignmentData);

        // Update consignment items
        if (items) {
            for (const item of items) {
                if (item.id) {
                    await updateById(ConsignmentItem, item.id, item);
                } else {
                    item.consignmentId = passedId;
                    await createOne(ConsignmentItem, item);
                }
            }
        }

        // Update documents
        if (documents) {
            for (const doc of documents) {
                if (doc.id) {
                    await updateById(Document, doc.id, doc);
                } else {
                    doc.consignmentId = passedId;
                    await createOne(Document, doc);
                }
            }
        }

        res.status(200).json(updatedConsignment);
    } catch (error) {
        console.error('Validation or update error:', error); // Log the full error details
        res.status(400).json({ error: error.message, issues: error.errors || [] });
    }
};


// Delete a consignment along with its items and documents
const deleteConsignment = async (req, res) => {
    const consignmentId = req.params.id;

    try {
        // Delete associated items
        await ConsignmentItem.destroy({ where: { consignmentId } });

        // Delete associated documents
        await Document.destroy({ where: { consignmentId } });

        // Delete consignment
        const consignment = await Consignment.findByPk(consignmentId);
        if (consignment) {
            await consignment.destroy();
            res.status(200).json({ message: 'Consignment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Consignment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export functions
module.exports = {
    createConsignment,
    readAllConsignments,
    readOneById,
    updateConsignment,
    deleteConsignment
};
