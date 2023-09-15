const { gql } = require("apollo-server-express");
const typeDefs_Category = gql`

  type languageSchema{
    type: LanguageType!,
    value: String!
  }

  type Category {
      id: ID!
      categoryPicture : String
      language: [languageSchema]
    }
  
  input LanguageInput {
    type: LanguageType!
    value: String!
  }


  input CategoryInput {
    categoryPicture: String
    language: [LanguageInput]
  }

  type Query {
    getAllCategories: [Category!]!
  }
  
  type Mutation {
    createCategory(input : CategoryInput): Category!
    deleteCategory(id: ID!): String
  }
  `;

module.exports = typeDefs_Category;