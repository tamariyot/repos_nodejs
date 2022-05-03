const mongoose = require('mongoose');
const product = require('./product');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    date: {
        type: Date,
        default: new Date,
        required: true
    },
    amount: {
        type: Number,
        default:1
    },
    products: [
        {
            prodId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"productModel"
            },
            quntity:{type:Number}
        }
    ]
})

module.exports = mongoose.model('orderModel', orderSchema);






