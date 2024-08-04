const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const ItemCode = sequelize.define('ItemCode', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    // Additional model options can go here
    timestamps: false, // Disable timestamps if not needed
    tableName: 'item_codes' // Specify the table name if different from model name
  });
  
  module.exports = ItemCode;