const Item = require('../models/Item');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createItem = handleCreate(Item);
exports.getAllItems = handleReadAll(Item);
exports.getItemById = handleReadById(Item);
exports.updateItemById = handleUpdateById(Item);
exports.deleteItemById = handleDeleteById(Item);