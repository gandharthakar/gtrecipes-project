const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

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
    recipe_author: {
        type: String,
        required: true
    },
    recipe_author_id: {
        type: String,
        required: true
    },
    recipe_created_at: {
        type: String,
        required: true
    }
});

const RecipeModel = models.recipes || model('recipes', recipeSchema);

module.exports = RecipeModel;