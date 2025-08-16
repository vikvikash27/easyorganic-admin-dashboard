const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in the .env file.');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
