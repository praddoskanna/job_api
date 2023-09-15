const User = require('../models/User');
const TempUser = require('../models/TempUser');
const errorMessages = require('../errorMessages');
const { GraphQLError } = require('graphql')

const verifyOTPFunction = async (username, otp, type, mode) => {
  try {
    const collectionName = type === "New_User" ? TempUser : type === "Existing_User" ? User : null;
    const userType = mode === "Phone" ? "phoneNumber" : mode === "Email" ? "email" : null;
    const user = await collectionName.findOne({ [userType]: username });

    if (!user) {
      throw new GraphQLError(errorMessages.USER_NOT_FOUND.message, {
        extensions: { code: errorMessages.USER_NOT_FOUND.code },
      });
    }
    const storedOTP = user.otp;
    if (otp.toString() == storedOTP) {
      return true;
    } else {
      return false;
    }
  }
  catch (error) {
    throw new GraphQLError(error, {
      extensions: { code: 500 },
    });
  }
}

module.exports = verifyOTPFunction;

