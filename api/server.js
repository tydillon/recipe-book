//frameworks to create the server in node. This lets me create routes

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useCreateIndex: true
})

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

const app = express()
app.use(bodyParser())

//define the route, then provide the req and res

//Main GET / route
app.get('/', (req, res) => {
  res.json({
    status: `You have reached the recipe server. Try other paths to reach what you're looking for! (Example: /recipes returns all recipes!)`
  })
})

//Want to be able to retrieve all recipes
app.get('/recipes', (req, res) => {
  Recipe.find({}).then(recipes => {
    res.json({ status: 'ok', data: recipes })
  })
})

//Want to be able to add a new recipe
//ask how to test this??
app.post('/recipes', (req, res) => {
  const rawRecipe = req.body
  const newRecipe = new Recipe(rawRecipe)
  newRecipe.save()
  res.json({ status: 'ok', newRecipe })
})

//Want to be able to retrieve an individual recipe
app.get('/recipes/:recipeId', (req, res) => {
  // get the recipe by its id
  Recipe.findById(req.params.recipeId).then(recipe => {
    res.json({ recipe })
  })
})

//Want to be able to edit a recipe
app.put('/recipes/:recipeId', (req, res) => {
  //get the recipe by its id
  Recipe.findById(req.params.recipeId).then(recipe => {
    //reassign each of the parameters of the recipe based on the new info
    recipe.name = req.body.name
    recipe.ingredients = req.body.ingredients
    recipe.recipePhoto = req.body.recipePhoto
    recipe.steps = req.body.steps
    // save it
    recipe.save()
    res.json(recipe)
  })
})

//Want to be able to delete a recipe
app.delete('/recipes/:recipeId', (req, response) => {
  Recipe.findByIdAndDelete(req.params.recipeId).then(res => {
    response.json({ status: 'ok', res: res })
  })
})

//can test db by going to localhost:8001/
app.listen(8001, () => {
  console.log('Server is up and running on PORT 8001')
})
