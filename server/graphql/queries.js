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

    type UserProfileNameAndPhoto {
        user_id: ID!
        user_name: String!
        user_photo: String
    }

    type UserGeneralSettings {
        user_id: ID!
        user_name: String!
        user_email: String!
        ripp: Int!
        cipp: Int!
    }

    type UserProfilePicture {
        user_id: ID!
        user_photo: String
    }

    type Query {
        getUserPhotoAndName(id: ID!): UserProfileNameAndPhoto
        getGeneralSettings(id: ID!): UserGeneralSettings
        getProfilePicture(id: ID!): UserProfilePicture
    }

    type Mutation {
        registerNewUser(full_name: String!, email: String!, password: String!, confirm_password: String!): CommonStatus!
        loginUser(email: String!, password: String!): LogStatus!
        updateGeneralSettings(id: ID!, user_name: String!, user_email: String!, ripp: Int!, cipp: Int!): CommonStatus!
        updatePassword(id: ID!, password: String!, confirm_password: String!): CommonStatus!
        updateProfilePicture(id: ID!, user_photo: String): CommonStatus!
    }
`;

module.exports = typeDefs;