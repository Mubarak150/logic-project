const RequisitionNote = require('../models/RequisitionNote');
const RequisitionNoteItem = require('../models/RequisitionNoteItem');
const { createOne, updateById, readAll, deleteById } = require('../utils/functions');

// Create a requisition note along with multiple items
const createRequisitionNote = async (req, res) => {
  const { requisitionNoteData, items } = req.body;

  try {
    // Create requisition note
    const requisitionNote = await createOne(RequisitionNote, requisitionNoteData);

    // Create requisition note items
    if (items && items.length > 0) {
      for (const item of items) {
        item.requisitionId = requisitionNote.id;
        await createOne(RequisitionNoteItem, item);
      }
    }

    res.status(201).json(requisitionNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all requisition notes
const readAllRequisitionNotes = async (req, res) => {
  try {
    const result = await readAll(RequisitionNote, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read a requisition note by ID
const readOneRequisitionNoteById = async (req, res) => {
  const requisitionNoteId = parseInt(req.params.id);

  try {
    if (isNaN(requisitionNoteId)) {
      return res.status(400).json({ error: 'Invalid requisition note ID' });
    }

    // Fetch requisition note data
    const requisitionNote = await RequisitionNote.findByPk(requisitionNoteId);

    if (!requisitionNote) {
      return res.status(404).json({ error: 'Requisition note not found' });
    }

    // Fetch associated items
    const items = await RequisitionNoteItem.findAll({
      where: { requisitionId: requisitionNoteId },
      attributes: [
        'id',
        'rationPerHousehold',
        'units',
        'status',
        'remarks'
      ]
    });

    // Prepare the response
    const response = {
      requisitionNoteData: requisitionNote.toJSON(),
      items
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching requisition note:', error);
    res.status(500).json({ error: 'Error fetching requisition note' });
  }
};

// Update a requisition note along with its items
const updateRequisitionNote = async (req, res) => {
  const requisitionNoteId = req.params.id;
  const { requisitionNoteData, items } = req.body;

  try {
    // Update requisition note
    const updatedRequisitionNote = await updateById(RequisitionNote, requisitionNoteId, requisitionNoteData);

    // Update requisition note items
    if (items) {
      for (const item of items) {
        if (item.id) {
          await updateById(RequisitionNoteItem, item.id, item);
        } else {
          item.requisitionId = requisitionNoteId;
          await createOne(RequisitionNoteItem, item);
        }
      }
    }

    res.status(200).json(updatedRequisitionNote);
  } catch (error) {
    console.error('Validation or update error:', error);
    res.status(400).json({ error: error.message, issues: error.errors || [] });
  }
};

// Delete a requisition note along with its items
const deleteRequisitionNote = async (req, res) => {
  const requisitionNoteId = req.params.id;

  try {
    // Delete associated items
    await RequisitionNoteItem.destroy({ where: { requisitionId: requisitionNoteId } });

    // Delete requisition note
    const requisitionNote = await RequisitionNote.findByPk(requisitionNoteId);
    if (requisitionNote) {
      await requisitionNote.destroy();
      res.status(200).json({ message: 'Requisition note deleted successfully'})
      } else {
        res.status(404).json({ error: 'Consignment not found' });
    } 

} catch (error) {
    res.status(500).json({error: error})
}
};

// Export functions
module.exports = {
createRequisitionNote,
readAllRequisitionNotes,
readOneRequisitionNoteById,
updateRequisitionNote,
deleteRequisitionNote
};
