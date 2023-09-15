const mongoose = require('mongoose');


const languageSchema = new mongoose.Schema({
    type: {
        type: String,
        unique: true,
        required: true,
        sparse: true
    },
    value: String
});

const categorySchema = new mongoose.Schema({
    categoryPicture: {
        type: String,
        default: null
    },
    language: [languageSchema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;