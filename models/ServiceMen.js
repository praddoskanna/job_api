const mongoose = require('mongoose');

const serviceMenSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  serviceMenId: { type: String, unique: true },
  ratings: { type: Number, min: 0, max: 5, default: 0 },
  status: { type: String, enum: ['Available', 'Busy', 'Offline'], null: true },
  currentLocation: { type: String, null: true },
  // requestedJobs: [Job]
}, { timestamps: true });

serviceMenSchema.pre('save', async function (next) {
  let unique = false;
  let randomPart;

  while (!unique) {
    randomPart = Math.floor(100000 + Math.random() * 900000);
    const existingServiceMen = await this.constructor.findOne({ serviceMenId: `#Expert${randomPart}` });
    if (!existingServiceMen) {
      unique = true;
    }
  }
  this.serviceMenId = `#Expert${randomPart}`;
  next();
});

const ServiceMen = mongoose.model('ServiceMen', serviceMenSchema);

module.exports = ServiceMen;