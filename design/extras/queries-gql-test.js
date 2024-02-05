const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Query {
        recipes: [RecipeType]
        recipe(id: ID!): RecipeType
        RecipeWithUser(id: ID!): RecipeWithUser
    }

    type GQLUser {
        name: String!
        email: String!
        profile_picture: String!
    }

    type Mutation {
        createGqlUser(name: String!, email: String!, profile_picture: String!): GQLUser!
    }

    type RecipeType {
        id: ID!,
        recipe_title: String,
        recipe_content: String,
        userid: String
    }

    type User {
        id: ID!,
        name: String,
        email: String,
        isAdmin: Boolean
    }

    type RecipeWithUser {
        id: ID!,
        recipe_title: String,
        recipe_content: String,
        userid: String
        user: [User]
    }
`;

// module.exports = typeDefs;