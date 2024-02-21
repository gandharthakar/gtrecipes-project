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

const recipeSchema = new Schema({
    recipe_title: {
        type: String,
        required: true
    },
    recipe_featured_image: {
        type: String,
    },
    recipe_categories: [String],
    recipe_summary: {
        type: String,
        required: true
    },
    recipe_content: {
        type: String,
        required: true
    },
    recipe_ingradients: [String],
    author: {
        type: authorSchema
    },
    recipe_created_at: {
        type: String,
        required: true
    }
});

const RecipeModel = models.recipes || model('recipes', recipeSchema);

module.exports = RecipeModel;