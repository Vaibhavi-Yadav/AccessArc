const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(require('cors')());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

module.exports = app;
