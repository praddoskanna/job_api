const { gql } = require("apollo-server-express");
const typeDefs_JOB = gql`
type Job {
    _id: ID!
    jobId: String
    jobprovider: JobProvider
    servicemen : ServiceMen
    category: Category
    subcategory: SubCategory
    description: String
    reportingDate: Date
    reportingTime: Date
    address: Address
    mapLocation: String
    remarks: String
    status: JobStatus
    ratings : Float
    jobprovider_feedback : String
    servicemen_feedback : String
    createdAt: Date
    updatedAt: Date
    }

  input JobInput {
    category_id: ID!
    subcategory_id: ID!
    jobprovider_id: ID!
    description: String
    reportingDate: Date
    reportingTime: Date
    flat: String
    street: String
    area: String
    city: String!
    pincode: String!
    mapLocation: String
    remarks: String
  }
 

  extend type Query {
    getJobDetailsByID(job_id: ID!): Job
    getAllJobsByCity(city:CityList!): [Job]
    getRecentlyCompletedJobsByCity(city:CityList!): [Job]
  }

  extend type Mutation {
    createJOB(input: JobInput!): Job
  }
`

module.exports = typeDefs_JOB