const { sequelize } = require('../config/db');
const PreviousStock = require('../models/PreviousStock'); // Updated model name
const PreviousStockItem = require('../models/PreviousStockItem'); // Updated model name

const { createOne, updateById, readAll, deleteById } = require('../utils/functions'); // Assuming these functions handle generic crud operations

const createPreviousStock = async (req, res) => {
  const { previousStockData, items } = req.body;
  const transaction = await sequelize.transaction(); // Start transaction
  try {
    const existingPreviousStock = await PreviousStock.count(); // check if already any row in the table (as per LOGIC APP only one entry allowed)
    if (existingPreviousStock > 0) {
        return res.status(400).json({ error: 'Only one PreviousStock record allowed' });
    }
    // Create PreviousStock
    const previousStock = await PreviousStock.create(previousStockData, { transaction });

    // Create PreviousStock Items
    if (items && items.length > 0) {
      const itemPromises = items.map(async (item) => {
        item.previousStockId = previousStock.id;
        return PreviousStockItem.create(item, { transaction });
      });
      await Promise.all(itemPromises);
    }

    await transaction.commit(); // Commit transaction if successful

    res.status(201).json(previousStock);
  } catch (error) {
    await transaction.rollback(); // Rollback on error
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


// read all the previous stocks
const readAllPreviousStocks = async (req, res) => {
  try {
    const result = await readAll(PreviousStock, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// read one by id
const readOnePreviousStockById = async (req, res) => {
  const previousStockId = parseInt(req.params.id);

  try {
    if (isNaN(previousStockId)) {
      return res.status(400).json({ error: 'Invalid PreviousStock ID' });
    }

    // Fetch previous stock data
    const previousStock = await PreviousStock.findByPk(previousStockId);

    if (!previousStock) {
      return res.status(404).json({ error: 'PreviousStock not found' });
    }

    // Fetch associated items
    const items = await PreviousStockItem.findAll({
      where: { previousStockId: previousStockId },
      attributes: ['itemId', 'units', 'packs', 'lossGain']
    });


    // Prepare the response
    const response = {
      previousStockData: previousStock.toJSON(),
      items: items.map(item => ({
        itemId: item.itemId,
        units: item.units,
        packs: item.packs,
        lossGain: item.lossGain
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching PreviousStock:', error);
    res.status(500).json({ error: 'Error fetching PreviousStock', issue: error.message });
  }
};

// Update a PreviousStock along with its items
const updatePreviousStock = async (req, res) => {
  const passedId = req.params.id;
  const { previousStockData, items } = req.body;

  try {
    // Update PreviousStock
    const updatedPreviousStock = await updateById(PreviousStock, passedId, previousStockData);

    // Update PreviousStock Items
    if (items) {
      for (const item of items) {
        if (item.id) {
          await updateById(PreviousStockItem, item.id, item);
        } else {
          item.previousStockId = passedId;
          await createOne(PreviousStockItem, item);
        }
      }
    }

    res.status(200).json(updatedPreviousStock);
  } catch (error) {
    console.error('Validation or update error:', error); // Log the full error details
    res.status(400).json({ error: error.message, issues: error.errors || [] });
  }
};


// Delete a PreviousStock along with its items and documents
const deletePreviousStock = async (req, res) => {
  const previousStockId = req.params.id;

  try {
    // Delete associated items
    await PreviousStockItem.destroy({ where: { previousStockId } });

    // Delete PreviousStock
    const previousStock = await PreviousStock.findByPk(previousStockId);
    if (previousStock) {
        await previousStock.destroy();
        res.status(200).json({ message: 'PreviousStock deleted successfully' });
    } else {
        res.status(404).json({ error: 'PreviousStock not found' });
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

// Export functions
module.exports = {
createPreviousStock,
readAllPreviousStocks,
readOnePreviousStockById,
updatePreviousStock,
deletePreviousStock
};
