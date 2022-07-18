const mongoose = require('mongoose');

const AddProductSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userId:String
});

module.exports = mongoose.model("add-products", AddProductSchema);