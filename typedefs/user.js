const { gql } = require("apollo-server-express");
const typeDefs_User = gql`
scalar Date

type Address {
    flat: String
    street: String
    area: String
    city: String
    pincode: String
  }
  
  type User {
    _id: ID!
    name: String
    email: String
    phoneNumber: String
    countryCode: Int
    profilePicture: String
    gender: Gender
    dob: Date
    addressList: [Address]
    preferredAddressIndex: Int
    createdAt: Date
    updatedAt: Date
    jobprovider: ID
    servicemen: ID
  }

  input AddressInput{
    flat: String!,
    street: String,
    area: String,
    city: String!,
    pincode: String!,
  }
  


  type Query {
    getUserById(userId: ID!): User
  }
  
  type Mutation {
    signup(username: String!, mode:UserMode!): String
    verifyOTP(username: String!, otp : Int!, type: UserType!, mode: UserMode!): User
    signin(username: String!, mode:UserMode!): String
    updateProfile(userId: ID!, name: String!, dob: Date! , gender:Gender! , address : AddressInput!, preferredAddressIndex: Int!) : User
    deleteUser(id: ID!): String
  }

`;

module.exports = typeDefs_User;