const express = require('express');
const { connectDB, sequelize } = require('./config/db'); // import Sequelize connection
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const defineAssociations = require('./modelRelations');
const authRoutes = require('./routes/auth');
const warehouseRoutes = require('./routes/warehouseRoutes');
const profileRoutes = require('./routes/profile');
const currencyRoutes = require('./routes/currencyRoutes');
const countryRoutes = require('./routes/countryRoutes');
const projectRoutes = require('./routes/projectRoutes');
const logisticPointRoutes = require('./routes/logisticPointRoutes'); // 
const itemsRoutes = require('./routes/itemsRoutes'); // 
const itemGroupRoutes = require('./routes/itemGroupRoutes');
const itemCodesRoutes = require('./routes/itemCodesRoutes'); // 
const transportRoutes = require('./routes/transportTypeRoutes');
const transportContractRoutes = require('./routes/transportContractRoutes');
const consignmentRoutes = require('./routes/consignmentRoutes'); 
const requisitionNoteRoutes = require('./routes/requisitionNoteRoutes');
const goodsReceivedRoutes = require('./routes/goodsReceivedRoutes');
const adjustmentRoutes = require('./routes/adjustmentRoutes');
const previousStockRoutes = require('./routes/previousStockRoutes');
const wayBillOutRoutes = require('./routes/wayBillOutRoutes');
const wayBillInRoutes = require('./routes/wayBillInRoutes');
const returningNoteRoutes = require('./routes/returningNoteRoutes');
const inOutDetailedCTNReport = require('./routes/reports/inOutDetailedCTNReport');
const exportRoutes = require('./routes/exportRoutes');
// const db = require('./models');

require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Define associations
defineAssociations();

// Routes setup
// 1. exporting excel
app.use('/', exportRoutes);

// 1. auth (registration, signin, and logout )
app.use('/api/auth', authRoutes);

// 1. master data: 
app.use('/master-data/profiles', profileRoutes);
app.use('/master-data/warehouses', warehouseRoutes);
app.use('/master-data/currencies', currencyRoutes);
app.use('/master-data/countries', countryRoutes);
app.use('/master-data/projects', projectRoutes);
app.use('/master-data/logistic-points', logisticPointRoutes);
app.use('/master-data/items', itemsRoutes);
app.use('/master-data/item-groups', itemGroupRoutes);
app.use('/master-data/item-codes', itemCodesRoutes);
app.use('/master-data/transport-types', transportRoutes);
app.use('/master-data/transport-contracts', transportContractRoutes);

// 2. logistic documents:
app.use('/logistics-documents/consignments', consignmentRoutes);
app.use('/logistics-documents/requisition-notes', requisitionNoteRoutes);
app.use('/logistics-documents/goods-received', goodsReceivedRoutes);
app.use('/logistics-documents/adjustments', adjustmentRoutes);
app.use('/logistics-documents/previous-stocks', previousStockRoutes);
app.use('/logistics-documents/way-bill-outs', wayBillOutRoutes); 
app.use('/logistics-documents/way-bill-ins', wayBillInRoutes); 
app.use('/logistics-documents/returning-notes', returningNoteRoutes);

// 3. reports: 
app.use('/reports/item-in-out', inOutDetailedCTNReport);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server with database connection and model sync
const startServer = async () => {
    await connectDB(); // Connect to the database

    // Sync models
    try {
        await sequelize.sync({ force: false });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error.message);
        process.exit(1);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
