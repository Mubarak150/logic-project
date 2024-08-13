const Consignment = require('./models/Consignment');
const Adjustment = require('./models/Adjustment');
const PreviousStock = require('./models/PreviousStock');
const Document = require('./models/Document');
const Item = require('./models/Item');
const Warehouse = require('./models/Warehouse');
const ConsignmentItem = require('./models/ConsignmentItem'); 
const AdjustmentItem = require('./models/AdjustmentItem');
const PreviousStockItem = require('./models/PreviousStockItem'); 
const RequisitionNote = require('./models/RequisitionNote');
const RequisitionNoteItem = require('./models/RequisitionNoteItem');
const GoodsReceived = require('./models/GoodsReceived');
const WayBillOut = require('./models/WayBillOut');
const WayBillOutItem = require('./models/WayBillOutItem');
const WayBillIn = require('./models/WayBillIn');
const ReturningNote = require('./models/ReturningNote');

const defineAssociations = () => {
  
  // Warehouse and Item relationship
  Warehouse.hasMany(Item, { foreignKey: 'warehouseId' });
  Item.belongsTo(Warehouse, { foreignKey: 'warehouseId' });
  RequisitionNoteItem.belongsTo(RequisitionNote, { foreignKey: 'requisitionId' });

  // Consignment and Document relationship
  Consignment.hasMany(Document, { foreignKey: 'consignmentId' });
  Document.belongsTo(Consignment, { foreignKey: 'consignmentId' });

  

   // Consignment has many Items through ConsignmentItem
   Consignment.belongsToMany(Item, {
    through: ConsignmentItem,
    foreignKey: 'consignmentId',
    as: 'items' // Alias used in query
  });

  // Define relationships between models
  RequisitionNoteItem.belongsTo(RequisitionNote, {
    foreignKey: 'requisitionId',
    onDelete: 'CASCADE'
  });

  // Item has many Consignments through ConsignmentItem
  Item.belongsToMany(Consignment, {
    through: ConsignmentItem,
    foreignKey: 'itemId',
    as: 'consignments' // Alias used in query
  });

   // Consignment and GoodsReceived relationship
   Consignment.hasMany(GoodsReceived, { foreignKey: 'consignmentId' });
   GoodsReceived.belongsTo(Consignment, { foreignKey: 'consignmentId' });

/////////////////////////////
   // Consignment association
    Consignment.hasMany(ConsignmentItem, { foreignKey: 'consignmentId' });

    // ConsignmentItem association (optional)
    ConsignmentItem.belongsTo(Consignment, { foreignKey: 'consignmentId' });

    // itemId is the foreign key in ConsignmentItem
    Item.belongsToMany(ConsignmentItem, { through: ConsignmentItem, foreignKey: 'itemId' });
    ConsignmentItem.belongsToMany(Item, { through: ConsignmentItem, foreignKey: 'itemId' });

///////////////////////
    // Adjustment association
    Adjustment.hasMany(AdjustmentItem, { foreignKey: 'adjustmentId' });

    // AdjustmentItem association (optional)
    AdjustmentItem.belongsTo(Adjustment, { foreignKey: 'adjustmentId' });

    // itemId is the foreign key in AdjustmentItem
    Item.belongsToMany(AdjustmentItem, { through: AdjustmentItem, foreignKey: 'itemId' });
    AdjustmentItem.belongsToMany(Item, { through: AdjustmentItem, foreignKey: 'itemId' });

///////////////////////
    // PreviousStock association
    PreviousStock.hasMany(PreviousStockItem, { foreignKey: 'previousStockId' });

    // PreviousStockItem association (optional)
    PreviousStockItem.belongsTo(PreviousStock, { foreignKey: 'previousStockId' });

    // itemId is the foreign key in PreviousStockItem
    Item.belongsToMany(PreviousStockItem, { through: PreviousStockItem, foreignKey: 'itemId' });
    PreviousStockItem.belongsToMany(Item, { through: PreviousStockItem, foreignKey: 'itemId' });

    // Associations of waybillout
    WayBillOut.hasMany(WayBillOutItem, { foreignKey: 'wayBillOutId' });
    WayBillOutItem.belongsTo(WayBillOut, { foreignKey: 'wayBillOutId' });

    WayBillOut.hasOne(WayBillIn, { foreignKey: 'wayBillOutId' });
    WayBillIn.belongsTo(WayBillOut, { foreignKey: 'wayBillOutId' });

    WayBillOut.hasOne(ReturningNote, { foreignKey: 'wayBillOutId' });
    ReturningNote.belongsTo(WayBillOut, { foreignKey: 'wayBillOutId' });

};



module.exports = defineAssociations;
