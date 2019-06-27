const mongoose = require('mongoose')

//creates the schema for mongoose
const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  ingredients: {
    type: [String],
    require: true
  },
  recipePhoto: {
    type: String
  },
  steps: {
    type: [String]
  }
})

//this assigns the schema into the mongoose model
const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
