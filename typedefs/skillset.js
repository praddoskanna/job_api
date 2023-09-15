const { gql } = require("apollo-server-express");

const typeDefs_SkillSet = gql`
  type SkillSet {
    id: ID!
    servicemen: ServiceMen!
    subcategory: SubCategory!
    category: Category!
    rating: Float
    experience: String
    description: String
    charge: String
  }

  extend type Query {
    getSkillSetsForServiceMen(servicemen_id: ID!): [SkillSet!]!
  }

  extend type Mutation {
    createSkillSet(
      servicemen_id: ID!
      subcategory_id: ID!
      category_id: ID!
      rating: Float
      experience: String
      description: String
      charge : String
    ): SkillSet!
    
    updateSkillSet(
      id: ID!
      subcategory_id: ID!
      category_id: ID!
      experience: String
      description: String
      charge: String
    ): SkillSet!
    deleteSkillSet(id: ID!): String!
  }
`;

module.exports = typeDefs_SkillSet;