const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  flat: String,
  street: String,
  area: String,
  city: String,
  pincode: String,
});

const userSchema = new mongoose.Schema({

  name: { type: String, null: true },
  email: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function (value) {
        return /^\+[0-9]{5,}$/.test(value);;
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  otp: { type: Number, null: true },
  profilePicture: { type: String, null: true },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], null: true },
  dob: { type: Date, null: true },
  addressList: [addressSchema],
  preferredAddressIndex: { type: Number, default: 0 },
  jobprovider : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobProvider',
    unique: true,
    sparse: true,
  },
  servicemen : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceMen',
    unique: true,
    sparse: true,
  }
},
  { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;