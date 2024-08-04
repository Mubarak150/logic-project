const ItemCode = require('../models/ItemCode');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createItemCode = handleCreate(ItemCode);
exports.getAllItemCodes = handleReadAll(ItemCode);
exports.getItemCodeById = handleReadById(ItemCode);
exports.updateItemCodeById = handleUpdateById(ItemCode);
exports.deleteItemCodeById = handleDeleteById(ItemCode);