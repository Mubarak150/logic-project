const WayBillIn = require('../models/WayBillIn');
const WayBillOut = require('../models/WayBillOut');
const {handleDeleteById, handleUpdateById} = require('../utils/functions')

const createWayBillIn = async (req, res) => {
  const data = req.body; 
  try {
    const newWayBillIn = await WayBillIn.create({
      ...data
    });

    res.status(201).json(newWayBillIn);
  } catch (error) {
    console.error('Error creating returning note:', error);
    res.status(500).json({ error: 'Failed to create returning note' });
  }
};

const getAllWayBillIns = async (req, res) => { 
    try {
      const wayBillInData = await WayBillIn.findAll({
        include: [
          {
            model: WayBillOut,
            attributes: ['id', 'documentNumber', 'country', 'project', 'finalDestination', 'from', 'attention', 'transportType', 'transportContract', 'vehicleRegistration', 'refDocType', 'warehouseId'],
          }
        ]
      });
  
      res.status(200).json(wayBillInData);
    } catch (error) {
      console.error('Error fetching returning note:', error);
      res.status(500).json({ error: 'Failed to fetch returning note' });
    }
  };

const deleteWayBillInById = handleDeleteById(WayBillIn);

const updateWayBillInById = handleUpdateById(WayBillIn);
  

module.exports = {createWayBillIn, getAllWayBillIns, deleteWayBillInById, updateWayBillInById }; 

