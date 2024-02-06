const { param } = require('../Routes/adminRoutes');
const admin = require('./../Models/adminModel');
const transaction = require('./../Models/transactionModel');
const ApiFeatures = require('./../Utils/ApiFeatures');


exports.getAllTransactions = async (req, res) => {
    try{
        const features = new ApiFeatures(transaction.find(), req.query)
                                .filter()
                                .sort()
                                .limitFields()
                                .paginate();
        let transactions = await features.query;
        //Mongoose 6.0 or less
        /**************Mongoose 6.0 or less************** 
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        const queryObj = {...req.query};
        excludeFields.forEach((el) => {
            delete queryObj[el]
        })
        const movies = await Movie.find(queryObj);
        **************************************************/

        res.status(200).json({
            status: 'success',
            length: transactions.length,
            data: {
                transactions
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
    
}

exports.gettransaction = async (req, res) => {
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

exports.updateTransaction = async (req, res) => {
    try{
        const updateTransaction = await transaction.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: "success",
            data: {
                transaction: updateTransaction
            }
        });
    }catch(err){
        res.status(404).json({
            status:"fail",
            message: err.message
        });
    }
}

exports.deleteTransaction = async (req, res) => {
    try{
        await transaction.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    }catch(err){
        res.status(404).json({
            status:"fail",
            message: err.message
        });
    }
}

