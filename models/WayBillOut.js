const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

    const WayBillOut = sequelize.define('WayBillOut', {
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
      attention: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      transportType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transportContract: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vehicleRegistration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deliveredByDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      deliveredByName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deliveredByFunction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deliveredByCondition: {
        type: DataTypes.ENUM('good', 'damaged', 'spoiled'),
        allowNull: false
      },

      transportedByName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transportedByFunction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transportedByCondition: {
        type: DataTypes.ENUM('good', 'damaged', 'spoiled'),
        allowNull: false
      },

      recievedByName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recievedByFunction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recievedByCondition: {
        type: DataTypes.ENUM('good', 'damaged', 'spoiled'),
        allowNull: false
      },

      commentsOnLoading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
 
    module.exports = WayBillOut;

  