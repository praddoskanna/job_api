const Category = require('../models/Category');
const SubCategory = require("../models/SubCategory");

const resolvers_Category = {
    Query: {
        getAllCategories: async () => {
            try {
                const categories = await Category.find();
                return categories;
            } catch (error) {
                throw new Error("Error fetching categories: " + error.message);
            }
        }
    }, Mutation: {
        createCategory: async (_, args) => {
            const categoryData = args.input;
            try {
                const newCategory = new Category({
                    categoryPicture: categoryData.categoryPicture,
                    language: categoryData.language
                });
                const savedCategory = await newCategory.save();
                return savedCategory;
            } catch (error) {
                throw new Error("Error creating category: " + error.message);
            }
        },
        deleteCategory: async (_, { id }) => {
            try {
                await SubCategory.deleteMany({ category: id });
                await Category.findByIdAndDelete(id);
                return "Category Deleted Successfully";
            } catch (error) {
                throw new Error("Error deleting category: " + error.message);
            }
        }
    }
};

module.exports = resolvers_Category;