const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type RegisterUser {
        full_name: String!
        email: String!
        password: String!
        confirm_password: String!
    }

    type RegStatus {
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

    type Query {
        getUserPhotoAndName(id: ID!): UserProfileNameAndPhoto
    }

    type Mutation {
        registerNewUser(full_name: String!, email: String!, password: String!, confirm_password: String!): RegStatus!
        loginUser(email: String!, password: String!): LogStatus!
    }
`;

module.exports = typeDefs;