const { param } = require('../Routes/costumerRoutes');
const costumer = require('./../Models/costumerModel');
const transaction = require('./../Models/transactionModel');
const ApiFeatures = require('./../Utils/ApiFeatures');


exports.getAllTransactions = async (req, res) => {
    try{
        const features = new ApiFeatures(transaction.find(), req.query)
                                .filter()
                                .sort()
                                .limitFields()
                                .paginate();
        let transaction = await features.query;
        res.status(200).json({
            status: 'success',
            length: transaction.length,
            data: {
                transaction
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
    
}

exports.getTransaction = async (req, res) => {
    try{
        const transaction = await transaction.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                transaction
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.createTransaction = async (req, res) => {
    try{
        const transaction = await transaction.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                transaction
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}




