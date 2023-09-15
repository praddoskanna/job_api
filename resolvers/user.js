const User = require('../models/User');
const TempUser = require('../models/TempUser');
const JobProvider = require('../models/JobProvider');
const ServiceMen = require('../models/ServiceMen');

const generateOTP = require('../utils/generateOTP');
const verifyOTPFunction = require('../utils/verifyOTP');
const errorMessages = require('../errorMessages');
const { GraphQLError } = require('graphql');
const SkillSet = require('../models/SkillSet');

const resolvers_User = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (error) {
        console.log(error);
        throw new GraphQLError(errorMessages.USER_NOT_FOUND.message, {
          extensions: { code: errorMessages.USER_NOT_FOUND.code },
        });
      }
    },
  },
  Mutation: {
    signup: async (_, { username, mode }) => {

      let existingUser;

      const userQuery = mode === "Phone" ? { phoneNumber: username } : { email: username };
      existingUser = await User.findOne(userQuery);
      if (!existingUser) {
        existingUser = await TempUser.findOne(userQuery);
      }

      if (existingUser) {
        throw new GraphQLError(errorMessages.USER_ALREADY_EXISTS.message, {
          extensions: { code: errorMessages.USER_ALREADY_EXISTS.code },
        });
      }

      const otp = generateOTP(username, mode);
      try {
        const newTempUser = new TempUser({
          [mode === "Phone" ? "phoneNumber" : "email"]: username,
          otp,
        });
        await newTempUser.save();
      } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
          throw new GraphQLError(error);
        }
        throw new GraphQLError(errorMessages.SIGNUP_FAILED.message, {
          extensions: { code: errorMessages.SIGNUP_FAILED.code },
        });
      }

      return otp;
    },

    verifyOTP: async (_, { username, otp, type, mode }) => {

      const isValidOTP = await verifyOTPFunction(username, otp, type, mode);

      if (isValidOTP) {
        // console.log("OTP VERIFIED");
        if (type == "New_User") {
          // console.log("Creating User");
          const newUser = await createUserFromTempUser(username, mode);
          return newUser;
        } else if (type == "Existing_User") {
          // console.log("Viewing User");
          const user = await User.findOne({ [mode === 'Phone' ? 'phoneNumber' : 'email']: username });
          user.otp = null;
          await user.save();
          return user;
        }

      }
      else {
        throw new GraphQLError(errorMessages.INVALID_OTP.message, {
          extensions: { code: errorMessages.INVALID_OTP.code },
        });
      }
    },

    signin: async (_, { username, mode }) => {

      let existingUser;

      const userQuery = mode === "Phone" ? { phoneNumber: username } : { email: username };
      existingUser = await User.findOne(userQuery);

      if (!existingUser) {
        throw new GraphQLError(errorMessages.USER_NOT_FOUND.message, {
          extensions: { code: errorMessages.USER_NOT_FOUND.code },
        });
      }
      try {
        const otp = generateOTP(username, mode);
        existingUser.otp = otp;
        await existingUser.save();
        return otp;
      }
      catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
          throw new GraphQLError(error);
        }
        else if (error.name === "User does not exist") {
          throw new GraphQLError(error);
        }
        throw new GraphQLError(errorMessages.SIGNIN_FAILED.message, {
          extensions: { code: errorMessages.SIGNIN_FAILED.code },
        });
      }

    },

    updateProfile: async (_, { userId, name, dob, gender, address, preferredAddressIndex }) => {

      const user = await User.findById(userId);

      if (!user) {
        throw new GraphQLError(errorMessages.USER_NOT_FOUND.message, {
          extensions: { code: errorMessages.USER_NOT_FOUND.code },
        });
      }
      try {

        user.name = name;
        user.dob = dob;
        user.gender = gender;
        user.addressList[preferredAddressIndex] = address;
        user.preferredAddressIndex = preferredAddressIndex;
        await user.save()
        return user;
      }
      catch (error) {
        console.error("Error Updating profile:", error);
        throw new GraphQLError(errorMessages.FAILED_TO_UPDATE.message, {
          extensions: { code: errorMessages.FAILED_TO_UPDATE.code },
        });
      }

    },
    deleteUser: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      try {
        const serviceMen = await ServiceMen.findOne({ user: user._id });
        if(serviceMen !== null){
          await SkillSet.deleteMany({ servicemen: serviceMen.id });
        }
        await ServiceMen.findOneAndDelete({ user: id })
        await JobProvider.findOneAndDelete({ user: id })
        await User.findByIdAndDelete(id);
        return "User Deleted Successfully";
      } catch (error) {
        throw new Error("Error deleting category: " + error.message);
      }
    }
  }
}

const createUserFromTempUser = async (username, mode) => {

  try {
    await TempUser.findOneAndDelete({ [mode === 'Phone' ? 'phoneNumber' : 'email']: username });
    const newUser = new User({
      [mode === 'Phone' ? 'phoneNumber' : 'email']: username
    });
    await newUser.save();
    const newJobProvider = new JobProvider({
      user: newUser._id,
    })
    await newJobProvider.save();
    const newServiceMen = new ServiceMen({
      user: newUser._id,
    })
    await newServiceMen.save();
    newUser.jobprovider = newJobProvider._id;
    newUser.servicemen = newServiceMen._id;
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(errorMessages.USER_CREATION_ERROR.message, {
      extensions: { code: errorMessages.USER_CREATION_ERROR.code },
    });

  }
};


module.exports = resolvers_User;