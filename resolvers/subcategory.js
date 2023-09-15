const Category = require("../models/Category");
const SubCategory = require('../models/SubCategory');

const resolvers_SubCategory = {

    Query: {
        getAllSubCategoriesForCategory: async (_, { category_id }) => {
            try {
                const subCategories = await SubCategory.find({ category: category_id }).populate('category');
                return subCategories;
            } catch (error) {
                throw new Error("Error fetching subcategories: " + error.message);
            }
        },
        getFeaturedSubCategory: async () => {
            featuredSubCategoriesList = ["64f6fc609a4215dc9a0c48d3","64f6fc8f9a4215dc9a0c48e7"]
            try {
                const subCategory = await SubCategory.find({
                    _id: { $in: featuredSubCategoriesList }
                });
                return subCategory;
            } catch (error) {
                throw new Error("Error fetching categories: " + error.message);
            }
        }
    },

    Mutation: {

        createSubCategory: async (_, args) => {

            const subCategoryData = args.input;

            try {
                const categoryIdString = subCategoryData.category_id.toString();
                const category = await Category.findById(categoryIdString);

                if (!category) {
                    throw new Error("Category not found");
                }

                const newSubCategory = new SubCategory({
                    subCategoryPicture: subCategoryData.subCategoryPicture,
                    category: subCategoryData.category_id,
                    language: subCategoryData.language
                });

                const savedSubCategory = await newSubCategory.save();
                return savedSubCategory.populate('category');

            } catch (error) {
                console.log(error);
                throw new Error("Error creating subcategory: " + error.message);
            }
        },
        deleteSubCategory: async (_, { id }) => {
            try {
                await SubCategory.findByIdAndDelete(id);
                return "Sub Category Deleted Successfully";
            } catch (error) {
                throw new Error("Error deleting subcategory: " + error.message);
            }
        }
    }
};

module.exports = resolvers_SubCategory;