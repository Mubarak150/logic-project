const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const PreviousStockItem = sequelize.define('PreviousStockItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  units: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  packs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lossGain: {
    type: DataTypes.ENUM('gain', 'loss'),
    allowNull: false,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true // Part of the composite primary key
  },
  previousStockId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true // Part of the composite primary key
  },
});

module.exports = PreviousStockItem;
