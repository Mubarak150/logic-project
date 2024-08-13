const { sequelize } = require('../config/db');
const Adjustment = require('../models/Adjustment');
const AdjustmentItem =  require('../models/AdjustmentItem');
const { createOne, updateById, readAll, deleteById } = require('../utils/functions');

const createAdjustment = async (req, res) => {
    const { adjustmentData, items } = req.body;
    const transaction = await sequelize.transaction(); // Start transaction
    try {
      
  
      // Create adjustment
      const adjustment = await Adjustment.create(adjustmentData, { transaction });
  
      // Create Adjustment items
      if (items && items.length > 0) {
        const itemPromises = items.map(async (item) => {
          item.adjustmentId = adjustment.id;
          return AdjustmentItem.create(item, { transaction });
        });
        await Promise.all(itemPromises);
      }
  
      await transaction.commit(); // Commit transaction if successful
  
      res.status(201).json(adjustment);
    } catch (error) {
      await transaction.rollback(); // Rollback on error
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
  

// read all the adjustments
const readAllAdjustments = async (req, res) => {
    try {
        const result = await readAll(Adjustment, req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// read one by id
const readOneById = async (req, res) => {
    const adjustmentId = parseInt(req.params.id);
  
    try {
      if (isNaN(adjustmentId)) {
        return res.status(400).json({ error: 'Invalid Adjustment ID' });
      }
  
      // Fetch adjustment data
      const adjustment = await Adjustment.findByPk(adjustmentId);
  
      if (!adjustment) {
        return res.status(404).json({ error: 'Adjustment not found' });
      }
  
      // Fetch associated items
      const items = await AdjustmentItem.findAll({
        where: { adjustmentId: adjustmentId },
        attributes: ['itemId', 'units', 'packs', 'lossGain']
      });
  
     
  
      // Prepare the response
      const response = {
        adjustmentData: adjustment.toJSON(),
        items: items.map(item => ({
          itemId: item.itemId,
          unitsConsigned: item.unitsConsigned,
          unitsPending: item.unitsPending
        })),
        
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching Adjustment:', error);
      res.status(500).json({ error: 'Error fetching Adjustment', issue: error.message });
    }
  };
// Update a Adjustment along with its items
const updateAdjustment = async (req, res) => {
    const passedId = req.params.id;
    const { adjustmentData, items } = req.body;

    try {
        // Update Adjustment
        const updatedAdjustment = await updateById(Adjustment, passedId, adjustmentData);

        // Update Adjustment items
        if (items) {
            for (const item of items) {
                if (item.id) {
                    await updateById(AdjustmentItem, item.id, item);
                } else {
                    item.adjustmentId = passedId;
                    await createOne(AdjustmentItem, item);
                }
            }
        }

       

        res.status(200).json(updatedAdjustment);
    } catch (error) {
        console.error('Validation or update error:', error); // Log the full error details
        res.status(400).json({ error: error.message, issues: error.errors || [] });
    }
};


// Delete a Adjustment along with its items and documents
const deleteAdjustment = async (req, res) => {
    const adjustmentId = req.params.id;

    try {
        // Delete associated items
        await AdjustmentItem.destroy({ where: { adjustmentId } });

        // Delete Adjustment
        const adjustment = await Adjustment.findByPk(adjustmentId);
        if (adjustment) {
            await adjustment.destroy();
            res.status(200).json({ message: 'Adjustment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Consignment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export functions
module.exports = {
    createAdjustment,
    readAllAdjustments,
    readOneById,
    updateAdjustment,
    deleteAdjustment
};
