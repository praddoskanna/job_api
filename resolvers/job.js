const JOB = require("../models/Job");
const JobProvider = require("../models/JobProvider");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const resolvers_JOB = {
    Query: {
        getJobDetailsByID: async (_, { job_id }) => {
            try {
                const jobData = await JOB.findById(job_id)
                    .populate('jobprovider')
                    .populate('category')
                    .populate('subcategory')
                    .populate('servicemen');

                return jobData;
            }
            catch (e) {
                console.log(e)
                throw new Error("Error fetching Job: " + e.message);
            }
        },
        getAllJobsByCity: async (_, { city }) => {
            try {
                // status: { $ne: 'Completed' }
                const allJobsData = await JOB.find({ 'address.city': city })
                    .populate('jobprovider')
                    .populate('category')
                    .populate('subcategory')
                    .populate('servicemen');
                return allJobsData;

            }
            catch (error) {
                console.log(error)
                throw new Error("Error fetching Jobs: " + error.message);
            }
        },
        getRecentlyCompletedJobsByCity: async (_, { city }) => {
            try {
                const recentJobsData = await JOB.find({ 'address.city': city, status: "Completed" })
                    .sort({ updatedAt: -1 }).limit(5)
                    .populate('jobprovider')
                    .populate('category')
                    .populate('subcategory')
                    .populate('servicemen');
                return recentJobsData;

            }
            catch (error) {
                console.log(error)
                throw new Error("Error fetching Jobs: " + error.message);
            }
        }
    },
    Mutation: {
        createJOB: async (_, args) => {
            const jobData = args.input;

            const category = await Category.findById(jobData.category_id);
            if (!category) {
                throw new Error("Category Does not Exist");
            }

            // Check if the subcategory with the provided ID exists
            const subcategory = await SubCategory.findById(jobData.subcategory_id);
            if (!subcategory) {
                throw new Error("Subcategory Does not Exist");
            }

            // Check if the job provider with the provided ID exists
            const jobProvider = await JobProvider.findById(jobData.jobprovider_id);
            if (!jobProvider) {
                throw new Error("Job Provider Does not Exist");
            }


            try {
                const newJobData = new JOB({
                    category: jobData.category_id,
                    subcategory: jobData.subcategory_id,
                    jobprovider: jobData.jobprovider_id,
                    description: jobData.description,
                    reportingDate: jobData.reportingDate,
                    reportingTime: jobData.reportingTime,
                    address: {
                        flat: jobData.flat,
                        street: jobData.street,
                        area: jobData.area,
                        city: jobData.city,
                        pincode: jobData.pincode,
                    },
                    mapLocation: jobData.mapLocation,
                    remarks: jobData.remarks,
                })
                const savedJobData = await newJobData.save();
                const populatedJobData = await JOB.findById(savedJobData._id)
                    .populate('jobprovider')
                    .populate('category')
                    .populate('subcategory')
                    .populate('servicemen');

                return populatedJobData;

                // return savedJobData;

            } catch (error) {
                console.log(error);
                throw new Error("Error creating Job: " + error.message);
            }
        }
    }
}

module.exports = resolvers_JOB;