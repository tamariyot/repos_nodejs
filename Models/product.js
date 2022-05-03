const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categoryId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        minlength: 2,
        required: true
    },
    imgUrl: {
        type: String
    }
})

module.exports = mongoose.model('productModel', productSchema);






