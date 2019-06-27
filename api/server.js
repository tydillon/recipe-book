//frameworks to create the server in node. This lets me create routes

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const RecipeRoutes = require('./routes/recipes')

mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const app = express()
app.use(bodyParser())
app.use('/recipes', RecipeRoutes)

//can test db by going to localhost:8001/
app.listen(8001, () => {
  console.log('Server is up and running on PORT 8001')
})
