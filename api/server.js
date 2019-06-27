//frameworks to create the server in node. This lets me create routes

const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true })

const app = express()

//define the route, then provide the req and res

//Main GET / route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Welcome to my server' })
})

//Want to be able to retrieve all recipes
app.get('/recipes', (req, res) => {
  res.json({ status: 'under construction' })
})

//Want to be able to add a new recipe
app.post('/recipes', (req, res) => {
  res.json({ status: 'under construction' })
})

app.get('/recipes/:recipeId', (req, res) => {
  res.json({ studentId: req.params.studentId })
})

app.listen(8001, () => {
  console.log('Server is up and running on PORT 8001')
})
