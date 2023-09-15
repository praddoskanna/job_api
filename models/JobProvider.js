const mongoose = require('mongoose');

const jobProviderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, 
    jobProviderId: { type: String, unique: true }, 
    ratings: { type: Number, min: 0, max: 5, default : 0 }, 
}, { timestamps: true });

jobProviderSchema.pre('save', async function(next) {
    let unique = false;
    let randomPart;

    while (!unique) {
        randomPart = Math.floor(100000 + Math.random() * 900000);
        const existingJobProvider = await this.constructor.findOne({ jobProviderId: `#Jober${randomPart}` });
        if (!existingJobProvider) {
            unique = true;
        }
    }
    this.jobProviderId = `#Jober${randomPart}`;
    next();
});

const JobProvider = mongoose.model('JobProvider', jobProviderSchema);

module.exports = JobProvider;
