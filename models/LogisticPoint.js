const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const LogisticPoint = sequelize.define('LogisticPoint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    logisticPoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    volume: {
      type: DataTypes.DECIMAL
    },
    siteType: {
      type: DataTypes.ENUM,
      values: ['donor', 'supplier', 'warehouse', 'distribution site', 'third party', 'NS stock', 'IFRC-preposition stock', 'unknown'],
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    telephone: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    POBox: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.TEXT
    },
    province: {
      type: DataTypes.STRING
    },
    region: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    },
    HLSsite: {
      type: DataTypes.STRING
    }
  }, {
    // Additional model options can go here
    timestamps: false, // Disable timestamps if not needed
    tableName: 'logistic_points' // Specify the table name if different from model name
  });
  
  module.exports = LogisticPoint;