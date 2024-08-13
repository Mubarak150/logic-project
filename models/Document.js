const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  consignmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Consignments', // Ensure this matches your Consignment table name
      key: 'id'
    }
  },
  documentType: {
    type: DataTypes.ENUM(
      'AWB',
      'B/L',
      'Certificate Of Insurance',
      'Certificate Of Origin',
      'Certificate Of Radioactivity',
      'Certificate Of Vessel\'s Classification',
      'Certificate Of Vessel\'s Cleanliness Of Vessel\'s Holds',
      'CMR',
      'Donation Certificate',
      'Fumigation Certificate',
      'GDP Certificate (Good Distribution Practice)',
      'Germination Certificate (For Seeds)',
      'GMP Certificate (Goods Manufacturing Practice)',
      'Health Certificate (Fit For Human Consumption)',
      'Inspection Certificate',
      'Invoice',
      'Packing List',
      'Phytosanitary Certificate',
      'Proforma Invoice',
      'Quality Certificate',
      'Statement Of No GMOs (Genetically Modified Organisms)',
      'Waybill',
      'WHO Certification Scheme'
    ),
    allowNull: false,
  }
}, {
  timestamps: true,
});


module.exports = Document;
