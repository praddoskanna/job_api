const mongoose = require('mongoose');


const languageSchema = new mongoose.Schema({
  type: {
      type: String,
  },
  value: String
});


const subCategorySchema = new mongoose.Schema({
    subCategoryPicture: {
      type: String,
      default : null
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    language: [languageSchema]
  });


const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;