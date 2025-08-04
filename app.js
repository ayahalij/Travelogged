require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const multer = require('multer');


const authorRoutes = require('./controllers/auth/routeController')
const postRoutes = require('./controllers/posts/routeController')
const apiRoutes = require('./routes/apiRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Setup JSX as the view engine
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static('public'))


// Create an empty data object for all views & routes
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

// Web routes (views)
app.use('/authors', authorRoutes)
app.use('/posts', postRoutes)


// API routes (JSON)
app.use('/api', apiRoutes)

// Catch-all 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

//uploding images in new folder
app.use('/uploads', express.static('uploads'));


module.exports = app