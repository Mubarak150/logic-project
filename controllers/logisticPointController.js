const LogisticPoint = require('../models/LogisticPoint');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createLogisticPoint = handleCreate(LogisticPoint);
exports.getAllLogisticPoints = handleReadAll(LogisticPoint);
exports.getLogisticPointById = handleReadById(LogisticPoint);
exports.updateLogisticPointById = handleUpdateById(LogisticPoint);
exports.deleteLogisticPointById = handleDeleteById(LogisticPoint);