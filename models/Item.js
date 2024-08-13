const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  itemCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  itemGroup: {
    type: DataTypes.STRING
  },
  itemDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commodityTrackingNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL
  },
  unitVolume: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitWeight: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  UM: {
    type: DataTypes.ENUM,
    values: ['ampoule', 'bag', 'bottle', 'centilitre', 'centimetre', 'decilitre', 'decimetre', 'grams', 'kg', 'kit', 'litre', 'metre', 'milligram', 'millilitre', 'millimetre', 'piece', 'sachet', 'metric ton', 'tube'],
    allowNull: false,
  },
  unitPerPack: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comments: {
    type: DataTypes.TEXT
  },
  supplyChannel: {
    type: DataTypes.ENUM,
    values: ['pipeline', 'purchasing', 'unexpected donation', 'previous stock'],
    allowNull: false,
  },
  UMP: {
    type: DataTypes.ENUM,
    values: ['ampoule', 'bag', 'bale', 'bottle', 'box', 'can', 'case', 'jar', 'kit', 'pack', 'pallet', 'roll', 'sachet', 'tin', 'vial'],
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE
  },
  origin: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  stockLevelMin: {
    type: DataTypes.INTEGER
  },
  stockLevelMax: {
    type: DataTypes.INTEGER
  },
  currency: {
    type: DataTypes.STRING
  }
}, {
  // Additional model options can go here
  timestamps: false, // Disable timestamps if not needed
  tableName: 'items' // Specify the table name if different from model name
});



module.exports = Item;
