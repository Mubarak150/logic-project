const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Warehouse = require('./Warehouse'); // Import the Warehouse model

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('1', '2', '3'),
        allowNull: false,
        defaultValue: '3'
    },
    warehouseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Warehouse, // foriegn key to warehouse if not master
            key: 'id'
        } //$2a$10$ewu9QW.2znD4d362K9y.BuCcx4TmmJy2OcpZMpiRuVWMOPjUWYaXG
        
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Define associations
User.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

module.exports = User;

