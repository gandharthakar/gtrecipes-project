const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const authorSchema = new Schema({
    author_id: {
        type: String,
        required: true
    },
    author_name: {
        type: String,
        required: true
    }
});

const recipeCategoriesSchema = new Schema({
    recipe_category_name: {
        type: String,
        required: true
    },
    recipe_category_slug: {
        type: String,
        required: true
    },
    author: {
        type: authorSchema
    }
});

const recipeCategoriesModel = models.recipe_categories || model('recipe_categories', recipeCategoriesSchema);

module.exports = recipeCategoriesModel;