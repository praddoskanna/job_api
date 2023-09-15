const { gql } = require("apollo-server-express");

const typeDefs_General = gql`
  scalar Upload

  type FileUpload {
    filename: String!
    mimetype: String!
    encoding: String!
    filepath : String! 
  }

  type Mutation {
    uploadFile(file: Upload!): FileUpload!
  }

  type Query {
      getCityList:[String]
      getAreaListByCity(city: CityList!): [String]
  }

  type ServiceMen {
    id: ID!
    user: User!
    serviceMenId: String!
    ratings: Float
    status: Status
    currentLocation: String
    createdAt: String
    updatedAt: String
  }

  type JobProvider {
    id: ID!
    user: User!
    jobProviderId: String!
    ratings: Float
    status: Status
    createdAt: String
    updatedAt: String
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }
  
  enum UserType {
    New_User
    Existing_User
  }
  
  enum UserMode {
    Phone
    Email
  }
  
  enum Status {
    Available
    Busy
    Offline
  }

  enum LanguageType {
    English
    Tamil
  }

  enum JobStatus {
    Open
    Accepted
    WIP
    Completed
    Canceled
  }

  enum CityList {
    Chennai
    Coimbatore
    Madurai
    Tiruppur
    Salem
    Tiruchirappalli
    Erode
    Tirunelveli
    Vellore
    Thoothukudi
  }

  
`;

module.exports = typeDefs_General