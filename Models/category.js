const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
 
    name: {
        type: String,
        minlength: 2,
        required: true
    }
})

module.exports = mongoose.model('categoryModel', categorySchema);






