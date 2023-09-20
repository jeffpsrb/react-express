const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id_stock: Number,
    name: {
        type: String,
        required: [true, 'field nama harus ada'],
        minlength: 3,
        maxlength: 50
    },

    price: {
        type: String,
        required: true,
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;