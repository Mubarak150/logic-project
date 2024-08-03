const Warehouse = require('../models/Warehouse');
const { createOne, readAll, readById, updateById, deleteById } = require('../utils/functions');

exports.createWarehouse = async (req, res) => {
  try {
    const warehouse = await createOne(Warehouse, req.body);
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await readAll(Warehouse);
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await readById(Warehouse, req.params.id);
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateWarehouseById = async (req, res) => {
  try {
    const warehouse = await updateById(Warehouse, req.params.id, req.body);
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWarehouseById = async (req, res) => {
  try {
    const warehouse = await deleteById(Warehouse, req.params.id);
    res.status(200).json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
