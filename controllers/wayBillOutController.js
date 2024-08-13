const { sequelize } = require('../config/db');
const WayBillOut = require('../models/WayBillOut'); // Updated model name
const WayBillOutItem = require('../models/WayBillOutItem'); // Updated model name

const { createOne, updateById, readAll, deleteById } = require('../utils/functions'); // Assuming these functions handle generic crud operations

const createWayBillOut = async (req, res) => {
  const { wayBillOutData, items } = req.body;
  const transaction = await sequelize.transaction(); // Start transaction
  try {

    // Check for existing WayBillOut record (optional)
    const existingWayBillOut = await WayBillOut.count();
    if (existingWayBillOut > 0) {
      return res.status(400).json({ error: 'Only one WayBillOut record allowed' });
    }

    // Create WayBillOut
    const wayBillOut = await WayBillOut.create(wayBillOutData, { transaction });

    // Create WayBillOut Items
    if (items && items.length > 0) {
      const itemPromises = items.map(async (item) => {
        item.wayBillOutId = wayBillOut.id;
        return WayBillOutItem.create(item, { transaction });
      });
      await Promise.all(itemPromises);
    }

    await transaction.commit(); // Commit transaction if successful

    res.status(201).json(wayBillOut);
  } catch (error) {
    await transaction.rollback(); // Rollback on error
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


// read all the waybills
const readAllWayBillOuts = async (req, res) => {
  try {
    const result = await readAll(WayBillOut, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// read one by id
const readOneWayBillOutById = async (req, res) => {
  const wayBillOutId = parseInt(req.params.id);

  try {
    if (isNaN(wayBillOutId)) {
      return res.status(400).json({ error: 'Invalid WayBillOut ID' });
    }

    // Fetch waybill data
    const wayBillOut = await WayBillOut.findByPk(wayBillOutId);

    if (!wayBillOut) {
      return res.status(404).json({ error: 'WayBillOut not found' });
    }

    // Fetch associated items
    const items = await WayBillOutItem.findAll({
      where: { wayBillOutId: wayBillOutId },
      attributes: ['itemId', 'units', 'packs', 'lossGain']
    });


    // Prepare the response
    const response = {
      wayBillOutData: wayBillOut.toJSON(),
      items: items.map(item => ({
        itemId: item.itemId,
        units: item.units,
        packs: item.packs,
        lossGain: item.lossGain
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching WayBillOut:', error);
    res.status(500).json({ error: 'Error fetching WayBillOut', issue: error.message });
  }
};

// Update a WayBillOut along with its items
const updateWayBillOut = async (req, res) => {
  const passedId = req.params.id;
  const { wayBillOutData, items } = req.body;

  try {
    // Update WayBillOut
    const updatedWayBillOut = await updateById(WayBillOut, passedId, wayBillOutData);

    // Update WayBillOut Items
    if (items) {
      for (const item of items) {
        if (item.id) {
          await updateById(WayBillOutItem, item.id, item);
        } else {
          item.wayBillOutId = passedId;
          await createOne(WayBillOutItem, item);
        }
      }
    }

    res.status(200).json(updatedWayBillOut);
  } catch (error) {
    await transaction.rollback();
    console.error('Validation or update error:', error); // Log the full error details
    res.status(400).json({ error: error.message, issues: error.errors || [] });
  }
};


// Delete a WayBillOut along with its items and documents
const deleteWayBillOut = async (req, res) => {
  const wayBillOutId = req.params.id;
    
  const transaction = await sequelize.transaction();
  try {

    // Delete associated items
    await WayBillOutItem.destroy({ where: { wayBillOutId }, transaction });

    // Delete WayBillOut
    const deletedCount = await WayBillOut.destroy({ where: { id: wayBillOutId }, transaction });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'WayBillOut not found' });
    }

    await transaction.commit();
    res.status(200).json({ message: 'WayBillOut deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};


// Export functions
module.exports = {
    createWayBillOut,
    readAllWayBillOuts,
    readOneWayBillOutById,
    updateWayBillOut,
    deleteWayBillOut
    };
