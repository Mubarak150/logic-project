const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

    const Consignment = sequelize.define('Consignment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
      documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalDestination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transportType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refDocType: {
        type: DataTypes.ENUM('CMR', 'AWB', 'B/L', 'Waybill', 'Others'),
        allowNull: true,
      },
      refDocNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      etdDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      etdTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      ataDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ataTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      etaDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      etaTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      regularCharter: {
        type: DataTypes.ENUM('Regular', 'Chartered', 'Military'),
        allowNull: true,
      },
      confirmedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      docsReceivedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      docsForwardedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
 
    module.exports = Consignment;

  