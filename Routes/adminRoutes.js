const express = require('express');
const adminController = require('./../Controllers/adminController');
const adminController = require('./../Controllers/adminController');

const router = express.Router();


router.route('/')
    .get(adminController.getAllTransactions)
    .post(adminController.createTransaction)


router.route('/:id')
    .get(adminController.gettransaction)
    .patch(adminController.updateTransaction)
    .delete(adminController.deleteTransaction)


module.exports = router;