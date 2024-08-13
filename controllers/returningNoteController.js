const ReturningNote = require('../models/ReturningNote');
const WayBillOut = require('../models/WayBillOut');
const {handleDeleteById, handleUpdateById} = require('../utils/functions')

const createReturningNote = async (req, res) => {
  const data = req.body; // the front end dev must pass the waybillout id of the selected waybillout, warehouseId of user along with all the fields input of returninig_note table. 

  try {
    const newReturningNote = await ReturningNote.create({
      ...data
    });

    res.status(201).json(newReturningNote);
  } catch (error) {
    console.error('Error creating returning note:', error);
    res.status(500).json({ error: 'Failed to create returning note' });
  }
};

const getAllReturningNotes = async (req, res) => { // via this... sending the data of all the returning_note and the data of thier relative waybillout. this is an array. 
    try {
      const returningNoteData = await ReturningNote.findAll({
        include: [
          {
            model: WayBillOut,
            attributes: ['id', 'documentNumber', 'country', 'project', 'finalDestination', 'from', 'attention', 'transportType', 'transportContract', 'vehicleRegistration', 'refDocType', 'warehouseId'],
          }
        ]
      });
  
      res.status(200).json(returningNoteData);
    } catch (error) {
      console.error('Error fetching returning note:', error);
      res.status(500).json({ error: 'Failed to fetch returning note' });
    }
  };

const deleteReturningNoteById = handleDeleteById(ReturningNote);

const updateReturningNoteById = handleUpdateById(ReturningNote);
  

module.exports = {createReturningNote, getAllReturningNotes, deleteReturningNoteById, updateReturningNoteById }; 

