const express = require('express')
const Recipe = require('../models/Recipe')
const router = express.Router()

// /recipes route
router
  .route('/')
  .get((req, res) => {
    Recipe.find({}).then(recipes => {
      res.json({ status: 'ok', data: recipes })
    })
  })
  .post((req, res) => {
    const rawRecipe = req.body
    const newRecipe = new Recipe(rawRecipe)
    newRecipe.save()
    res.json({ status: 'ok', newRecipe })
  })

// /recipes/:recipeId
router
  .route('/:recipeId')
  .get((req, res) => {
    Recipe.findById(req.params.recipeId).then(recipe => {
      res.json(recipe)
    })
  })
  .put((req, res) => {
    Recipe.findById(req.params.recipeId).then(recipe => {
      recipe.name = req.body.name
      recipe.ingredients = req.body.ingredients
      recipe.recipePhoto = req.body.recipePhoto
      recipe.steps = req.body.steps

      recipe.save()
      res.json(recipe)
    })
  })
  .delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.recipeId).then(res => {
      res.json({ status: 'ok', res: res })
    })
  })

module.exports = router
