const SkillSet = require('../models/SkillSet');
const ServiceMen = require('../models/ServiceMen');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

const resolvers_SkillSet = {
    Query: {
        getSkillSetsForServiceMen: async (_, { servicemen_id }) => {
            try {
                const skillSets = await SkillSet.find({ servicemen: servicemen_id })
                    .populate('subcategory')
                    .populate('category')
                    .populate('servicemen');
                return skillSets;
            } catch (error) {
                throw new Error("Error fetching skill sets: " + error.message);
            }
        }
    },
    Mutation: {
        createSkillSet: async (_, { servicemen_id, subcategory_id, category_id, rating, experience, description, charge }) => {
            try {
                const serviceMan = await ServiceMen.findById(servicemen_id);

                if (!serviceMan) {
                    throw new Error("ServiceMan not found");
                }

                const categoryData = await Category.findById(category_id);

                if (!categoryData) {
                    throw new Error("Category not found");
                }

                const subcategoryData = await SubCategory.findById(subcategory_id);

                if (!subcategoryData) {
                    throw new Error("Sub Category not found");
                }

                const alreadyExist = await SkillSet.findOne({
                    servicemen: servicemen_id,
                    category: category_id,
                    subcategory: subcategory_id,
                });

                if (alreadyExist) {
                    throw new Error("SkillSet already Exist");
                }

                const newSkillSet = new SkillSet({
                    servicemen: servicemen_id,
                    subcategory: subcategory_id,
                    category: category_id,
                    rating,
                    experience,
                    description,
                    charge
                });

                const savedSkillSet = await newSkillSet.save();
                const populatedSkillSet = await SkillSet.findById(savedSkillSet._id)
                    .populate('subcategory')
                    .populate('category')
                    .populate('servicemen');

                return populatedSkillSet;
            } catch (error) {
                throw new Error("Error creating skill set: " + error.message);
            }
        },
        updateSkillSet: async (_, { id, subcategory_id, category_id, experience, description, charge }) => {

            const categoryData = await Category.findById(category_id);

            if (!categoryData) {
                throw new Error("Category not found");
            }

            const subcategoryData = await SubCategory.findById(subcategory_id);

            if (!subcategoryData) {
                throw new Error("Sub Category not found");
            }

            try {

                const updatedSkillSet = await SkillSet.findByIdAndUpdate(
                    id,
                    {
                        experience,
                        description,
                        subcategory: subcategory_id,
                        category: category_id,
                        charge
                    },
                    { new: true }
                );

                const populatedSkillSet = await SkillSet.findById(updatedSkillSet._id)
                    .populate('subcategory')
                    .populate('category')
                    .populate('servicemen');

                return populatedSkillSet;

            } catch (error) {
                throw new Error("Error editing skill set: " + error.message);
            }
        },
        deleteSkillSet: async (_, { id }) => {
            try {
                await SkillSet.findByIdAndDelete(id);
                return "Skill Set Deleted Successfully";
            } catch (error) {
                throw new Error("Error deleting skill set: " + error.message);
            }
        }
    }
};

module.exports = resolvers_SkillSet;