const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

    const Adjustment = sequelize.define('Adjustment', {
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      approverName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approverFunction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supervisorFunction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supervisorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
 
    module.exports = Adjustment;