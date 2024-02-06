const mongoose = require('mongoose');
const fs = require('fs');

const transactionSchema = new mongoose.Schema({
    status: { 
        type: String,
         required: true
     },
    amount: {
        type: Number,
        require: true
    },
    createdBy: String
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

transactionSchema.virtual('durationInHours').get(function(){
    return this.duration / 60;
})

//EXECUTED BEFORE THE DOCUMENT IS SAVED IN DB
//.save() or .create()
//inserMany, findByIdAndUpdate will not work
transactionSchema.pre('save', function(next) {
    this.createdBy = 'asalbabaei';
    next();
})

transactionSchema.post('save', function(doc, next){
    const content = `A new costomer document with name ${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'}, (err) => {
        console.log(err.message);
    });
    next();
});


const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;