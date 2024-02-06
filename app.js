//IMPORT PACKAGE
const express = require('express');
const morgan = require('morgan');
const costumerRouter = require('./Routes/costumerRoutes');
const adminRouter = require('./Routes/adminRoutes');
const transactionRouter = require('./Routes/transactionRouter');

let app = express();

app.use(express.json());

app.use(express.static('./public'))

//USING ROUTES
app.use('/api/v1/costumer', costumerRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/transaction', transactionRouter)

module.exports = app;

