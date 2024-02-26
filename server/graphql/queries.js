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

    type DeleteAccountType {
        message: String!
        success: Boolean!
        recipe_featured_image: [String]
        profile_photo: String
    }

    type DeleteRecipesType {
        message: String!
        success: Boolean!
        recipe_featured_image: [String]
    }

    type LogStatus {
        user_id: String!
        token: String!
        message: String!
        success: Boolean!
    }

    type AuthorType {
        author_id: String!
        author_name: String!
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
        recipe_category_name: String!
        recipe_category_slug: String!
        author: AuthorType!
    }

    type RecipeType {
        id: ID!
        recipe_title: String!
        recipe_featured_image: String!
        recipe_categories: [RecipeCategories]
        recipe_summary: String!
        recipe_content: String!
        recipe_ingradients: [String]
        author: AuthorType!
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

        # Recipe Queries.
        getAllRecipes(id: ID!): [RecipeType]
        getSingleRecipe(id: ID!, user_id: String!): [RecipeType]
    }

    type Mutation {
        # Site Users Mutations.
        registerNewUser(full_name: String!, email: String!, password: String!, confirm_password: String!): CommonStatus!
        loginUser(email: String!, password: String!): LogStatus!
        updateGeneralSettings(id: ID!, user_name: String!, user_email: String!, ripp: Int!, cipp: Int!): CommonStatus!
        updatePassword(id: ID!, password: String!, confirm_password: String!): CommonStatus!
        updateProfilePicture(id: ID!, user_photo: String): CommonStatus!
        deleteAccount(id: ID!): DeleteAccountType!

        # Categories Mutations.
        createRecipeCategories(recipe_category_name: String!, recipe_category_slug: String!, recipe_category_author_id: String!, recipe_category_author_name: String!): CommonStatus!
        updateRecipeCategories(recipe_category_name: String!, category_name_old: String!, recipe_category_slug: String!, recipe_category_author_id: String!): CommonStatus!
        deleteRecipeCategory(id: ID!, user_id: String!): CommonStatus!
        deleteAllRecipeCategory(user_id: String!): CommonStatus!

        # Recipe Mutations.
        createNewRecipe(recipe_title: String!, recipe_featured_image: String!, recipe_categories: [String], recipe_summary: String!, recipe_content: String!, recipe_ingradients: [String], recipe_author: String!, recipe_author_id: String!, recipe_created_at: String!): CommonStatus!
        updateRecipe(id: ID!, user_id: String!, recipe_title: String!, recipe_featured_image: String!, recipe_categories: [String], recipe_summary: String!, recipe_content: String!, recipe_ingradients: [String]): CommonStatus!
        deleteRecipe(id: ID!, user_id: String!): CommonStatus!
        deleteAllRecipes(user_id: String!): DeleteRecipesType
    }
`;

module.exports = typeDefs;