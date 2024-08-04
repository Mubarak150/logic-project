const express = require('express');
const { connectDB, sequelize } = require('./config/db'); // import Sequelize connection
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
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
const exportRoutes = require('./routes/exportRoutes');

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

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/profiles', profileRoutes);
app.use('/currencies', currencyRoutes);
app.use('/countries', countryRoutes);
app.use('/projects', projectRoutes);
app.use('/logisticPoints', logisticPointRoutes);
app.use('/items', itemsRoutes);
app.use('/item-groups', itemGroupRoutes);
app.use('/item-codes', itemCodesRoutes);
app.use('/transport-types', transportRoutes);
app.use('/transport-contracts', transportContractRoutes);
app.use('/', exportRoutes);

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
