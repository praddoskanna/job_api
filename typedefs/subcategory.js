const { gql } = require("apollo-server-express");

const typeDefs_SubCategory = gql`

  type SubCategory {
    id: ID!
    subCategoryPicture: String
    category: Category!
    language : [languageSchema]
  }

  input SubCategoryInput {
    subCategoryPicture: String
    category_id: ID!
    language: [LanguageInput]
  }

  type Query {
    getAllSubCategoriesForCategory(category_id: ID!): [SubCategory!]!
    getFeaturedSubCategory:[SubCategory] 
  }

  type Mutation {
    createSubCategory(input : SubCategoryInput ): SubCategory!
    deleteSubCategory(id: ID!): String!
  }
`;

module.exports = typeDefs_SubCategory;