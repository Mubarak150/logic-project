const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Assuming you have a db config

const Consignment = require('./Consignment'); // Assuming Consignment model exists

const GoodsReceived = sequelize.define('GoodsReceived', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  consignmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Consignment,
      key: 'id'
    }
  },
  deliveredBy: {
    type: DataTypes.STRING
  },
  deliveredByDate: {
    type: DataTypes.DATE
  },
  deliveredByFunction: {
    type: DataTypes.STRING
  },
  deliveredByCondition: {
    type: DataTypes.ENUM('good', 'spoiled', 'damaged')
  },
  receivedBy: {
    type: DataTypes.STRING
  },
  receivedByDate: {
    type: DataTypes.DATE
  },
  receivedByFunction: {
    type: DataTypes.STRING
  },
  receivedByCondition: {
    type: DataTypes.ENUM('good', 'spoiled', 'damaged')
  },
  comments: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'goods_received' // Optional: Explicitly set table name
});

module.exports = GoodsReceived;
