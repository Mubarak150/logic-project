const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const RequisitionNote = sequelize.define('RequisitionNote', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departmentTelephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    distributionSite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deliveryDate: {
      type: DataTypes.DATEONLY, // Or DataTypes.DATE for date and time
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactTelephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    households: {
      type: DataTypes.INTEGER
    }, // Optional
    requesterName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requestDate: {
      type: DataTypes.DATEONLY, // Or DataTypes.DATE for date and time
      allowNull: false
    },
    logisticsName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logisticsDate: {
      type: DataTypes.DATEONLY, // Or DataTypes.DATE for date and time
      allowNull: false
    },
    programCoordinator: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Additional model options can go here
    timestamps: false, // Disable timestamps if not needed
    tableName: 'requisition_note' // Specify the table name if different from model name
});
  
module.exports = RequisitionNote;