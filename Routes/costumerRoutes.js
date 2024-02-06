const express = require('express');
const costumerController = require('./../Controllers/costumerController');

const router = express.Router();


router.route('/')
    .get(costumerController.getAllTransactions)
    .post(costumerController.createTransaction)


router.route('/:id')
    .get(costumerController.getTransaction)   

module.exports = router;