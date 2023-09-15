const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({

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
    otp: { type: Number },
}, { timestamps: true });

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;