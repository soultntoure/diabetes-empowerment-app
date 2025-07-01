const app = require('./app');
const { connectDB } = require('./config/db');

// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
