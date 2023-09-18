const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const password = config.MONGODB_PASSWORD
const mongoUrl = `mongodb+srv://pranathik2001:${password}@cluster0.ptqxg5d.mongodb.net/blogApp?retryWrites=true&w=majority`

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.get('/', (request, response) => {
    response.send("Hello World!")
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app 