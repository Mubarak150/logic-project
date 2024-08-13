const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

    const WayBillOutItem = sequelize.define('WayBillOutItem', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      units: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      packs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true
      },
      requisitionNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wayBillOutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },
    });
  
    module.exports = WayBillOutItem;
