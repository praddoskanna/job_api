const mongoose = require('mongoose');

const skillsetSchema = new mongoose.Schema({
    servicemen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceMen',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {
        type: Number,
        default: null
    },
    experience: {
        type: String,
        null: true
    },
    description: {
        type: String,
        null: true
    },
    charge: {
        type: String,
        null: true
    }
});

const SkillSet = mongoose.model('SkillSet', skillsetSchema);

module.exports = SkillSet;