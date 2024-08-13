const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Assuming you have a db config

const WayBillOut = require('./WayBillOut'); // Assuming WayBillOut model exists

const WayBillIn = sequelize.define('WayBillIn', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  wayBillOutId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: WayBillOut,
      key: 'id'
    }
  },
  transportedBy: {
    type: DataTypes.STRING
  },
  transportedByDate: {
    type: DataTypes.DATE
  },
  transportedByFunction: {
    type: DataTypes.STRING
  },
  transportedByCondition: {
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
  commentsAtReception: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'returning_note' // Optional: Explicitly set table name
});

module.exports = WayBillIn;
