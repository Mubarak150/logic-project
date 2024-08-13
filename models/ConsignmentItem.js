const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

    const ConsignmentItem = sequelize.define('ConsignmentItem', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      unitsConsigned: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitsPending: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },
      consignmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },
    });
  
    module.exports = ConsignmentItem;
