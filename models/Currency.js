const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Currency = sequelize.define('Currency', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = Currency;




