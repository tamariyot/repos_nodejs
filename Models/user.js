const mongoose = require('mongoose');
const {isEmail}=require('validator');

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
    numHouse: Number
})
const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        minlength: 2,
        //required: true
    },
    lName: {
        type: String,
        minlength: 2,
        //required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 8,
        validate:[isEmail,'please enter current email']
        //required: true
    },
    password: {
        type: Number,
        //required: true
    },
    adress: {
        type: [addressSchema]
    },
    lastVisit: {
        date: {
            type: Date,
            default: new Date,
            //required: true
        },
    }
})

userSchema.virtual('allOrdersByUserId',{
ref:'orderModel',
localField:'_id',
foreignField:'userId'
},{virtuals:true}) 

userSchema.set('toJSON',{virtuals:true})
module.exports = mongoose.model('userModel', userSchema);






