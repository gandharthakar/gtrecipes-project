const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const siteUsersSchema = new Schema({
    user_full_name: {
        type: String,
        required: true
    },
    user_profile_photo: {
        type: String,
        required: false
    },
    user_email: {
        type: String,
        required: [true, "Email is Required."],
        unique: [true, 'Email Already Exist.']
    },
    user_password: {
        type: String,
        min: [8, "Password Should Have Minimum 8 Characters"],
        required: true
    },
    user_recipe_items_per_page: {
        type: Number,
        min: 1,
        max: 20,
        required: true
    },
    user_categories_items_per_page: {
        type: Number,
        min: 1,
        max: 20,
        required: true
    },
    user_saved_recipes_items_per_page: {
        type: Number,
        min: 1,
        max: 20,
        required: true
    },
    saved_recipes: [String]
})

const SiteUserModel = models.site_users || model('site_users', siteUsersSchema);

module.exports = SiteUserModel;