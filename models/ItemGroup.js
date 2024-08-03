const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const ItemGroup = sequelize.define('ItemGroup', {
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
    comments: {
        type: DataTypes.STRING,
        allowNull: true // Optional field, so allowNull is true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = ItemGroup;

