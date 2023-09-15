const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    flat: String,
    street: String,
    area: String,
    city: String,
    pincode: String,
  });


const jobSchema = new mongoose.Schema({

    jobId: { type: String, unique: true },
    jobprovider: { type: mongoose.Schema.Types.ObjectId, ref: 'JobProvider', required: true },
    servicemen : {type: mongoose.Schema.Types.ObjectId, ref: 'ServiceMen', default : null},
    category : {type: mongoose.Schema.Types.ObjectId, ref: 'Category',required : true },
    subcategory : {type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory',required : true },
    description : {type: String , required : true},
    reportingDate : {type: Date, default: null},
    reportingTime : {type: Date, default: null},
    address :  addressSchema,
    mapLocation: {type: String , null : true},
    remarks : {type: String , default : null},
    status: { type: String, enum: ['Open', 'Accepted', 'WIP', 'Completed', 'Canceled'], default: 'Open' },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    jobprovider_feedback: {type : String, null :true  },
    servicemen_feedback: {type : String, null :true  },
    otp: {type: Number , null :true},

    // requestedServiceMen : [ServiceMen]

    
}, { timestamps: true });



jobSchema.pre('save', async function (next) {
    let unique = false;
    let randomPart;

    while (!unique) {
        randomPart = Math.floor(100000 + Math.random() * 900000);
        const existingJOB = await this.constructor.findOne({ serviceMenId: `#JOB${randomPart}` });
        if (!existingJOB) {
            unique = true;
        }
    }
    this.jobId = `#JOB${randomPart}`;
    next();
});

const Job = mongoose.model('JOB', jobSchema);

module.exports = Job;