const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type RegisterUser {
        full_name: String!
        email: String!
        password: String!
        confirm_password: String!
    }

    type CommonStatus {
        message: String!
        success: Boolean!
    }

    type LogStatus {
        user_id: String!
        token: String!
        message: String!
        success: Boolean!
    }
    
    type SiteUser {
        user_id: ID!
        user_name: String!
        user_email: String!
        user_photo: String
        ripp: Int!
        cipp: Int!
    }

    type RecipeCategories {
        id: ID!
        category_name: String!
        category_slug: String!
        category_auth_id: String!
        category_auth_name: String!
    }

    type RecipeType {
        id: ID!
        recipe_title: String!
        recipe_featured_image: String!
        recipe_categories: [String!]
        recipe_summary: String!
        recipe_content: String!
        recipe_ingradients: [String!]
        recipe_author: String!
        recipe_author_id: String!
        recipe_created_at: String!
    }

    type PerPageGenSet {
        category_per_page: Int!
        recipes_per_page: Int!
    }

    type Query {
        # Site Users Queries.
        getUserPhotoAndName(id: ID!): SiteUser
        getGeneralSettings(id: ID!): SiteUser
        getProfilePicture(id: ID!): SiteUser
        getPerPagesCount(id: ID!): PerPageGenSet
        getUserFullName(id: ID!): SiteUser

        # Categories Queries.
        getAllRecipeCategories(id: ID!): [RecipeCategories]
    }

    type Mutation {
        # Site Users Mutations.
        registerNewUser(full_name: String!, email: String!, password: String!, confirm_password: String!): CommonStatus!
        loginUser(email: String!, password: String!): LogStatus!
        updateGeneralSettings(id: ID!, user_name: String!, user_email: String!, ripp: Int!, cipp: Int!): CommonStatus!
        updatePassword(id: ID!, password: String!, confirm_password: String!): CommonStatus!
        updateProfilePicture(id: ID!, user_photo: String): CommonStatus!
        deleteAccount(id: ID!): CommonStatus!

        # Categories Mutations.
        createRecipeCategories(category_name: String!, category_slug: String!, category_auth_id: String!, category_auth_name: String!): CommonStatus!
        updateRecipeCategories(category_name: String!, category_name_old: String!, category_slug: String!, category_auth_id: String!): CommonStatus!
        deleteRecipeCategory(id: ID!, user_id: String!): CommonStatus!

        # Recipe Mutations.
        createNewRecipe(recipe_title: String!, recipe_featured_image: String!, recipe_categories: [String!], recipe_summary: String!, recipe_content: String!, recipe_ingradients: [String!], recipe_author: String!, recipe_author_id: String!, recipe_created_at: String!): CommonStatus!
    }
`;

module.exports = typeDefs;