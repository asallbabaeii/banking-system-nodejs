const mongoose = require('mongoose');
const fs = require('fs');
const validator = require('validator');

const costumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field!'],
        unique: true,
        maxlength: [100, "name must not have more than 100 characters"],
        minlength: [4, " name must have at least 4 charachters"],
        trim: true,
        validate: [validator.isAlpha, "Name should only contain alphabets."]
    },
    username: {
         type: String,
         required: true,
         unique: true 
    },
    password: { 
        type: String,
         required: true
     },
    email: {
        type: Number,
        required: true,
        unique:true
    },
    age: {
        type: Number,
        validate: {
            validator: function(value){
                return value >= 10 && value <= 90;
            },
            message: "age ({VALUE}) should be above 10 and below 90"
        }
    },
    address: {
        type: [String],
        required: [true, 'Directors is required field!']
    },
    addres: {
        type: [String],
        require: [true, 'actors is required field!']
    },
    phonenumber: {
        type: Number,
        require: true,
        unique:true
    },
    createdBy: String
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

costumerSchema.virtual('durationInHours').get(function(){
    return this.duration / 60;
})

//EXECUTED BEFORE THE DOCUMENT IS SAVED IN DB
//.save() or .create()
//inserMany, findByIdAndUpdate will not work
costumerSchema.pre('save', function(next) {
    this.createdBy = 'asalbabaei';
    next();
})

costumerSchema.post('save', function(doc, next){
    const content = `A new costomer document with name ${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'}, (err) => {
        console.log(err.message);
    });
    next();
});


const Costumer = mongoose.model('costumer', costumerSchema);

module.exports = Costumer;