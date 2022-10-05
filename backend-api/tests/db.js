const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = process.env.DB_STRING_TEST;
mongoose.connect(testConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Testing database connected');
});

