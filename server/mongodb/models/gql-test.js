const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const GQLTest = new Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String,
        required: [true, "Email is Required."],
        unique: [true, 'Email Already Exist.']
    },
    user_profile_picture: {
        type: String
    }
})

const createGQLUserModel = models.users || model('users', GQLTest);

module.exports = createGQLUserModel;