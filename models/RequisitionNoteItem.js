const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const RequisitionNote = require('./RequisitionNote'); // Assuming RequisitionNote model is in the same directory

const RequisitionNoteItem = sequelize.define('RequisitionNoteItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rationPerHousehold: {
    type: DataTypes.INTEGER
  }, // Optional
  units: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'closed', 'cancelled'),
    allowNull: false
  },
  remarks: {
    type: DataTypes.TEXT
  } // Optional
}, {
  // Define additional options here if needed
});

// Define the foreign key relationship
RequisitionNoteItem.belongsTo(RequisitionNote, {
  foreignKey: 'requisitionId',
  onDelete: 'CASCADE' // Delete items when requisition is deleted
});

module.exports = RequisitionNoteItem;
