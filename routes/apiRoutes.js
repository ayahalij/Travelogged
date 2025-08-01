const express = require('express')
const router = express.Router()

const authorApiController = require('../controllers/auth/apiController')
const postApiController = require('../controllers/posts/apiController')
const postDataController = require('../controllers/posts/dataController')

// Author API Routes
router.post('/authors', authorApiController.createAuthor)
router.post('/authors/login', authorApiController.loginAuthor)
router.get('/authors/profile', authorApiController.auth, authorApiController.getProfile)

// Post API Routes
router.get('/posts', authorApiController.auth, postDataController.index, postApiController.index)
router.get('/posts/:id', authorApiController.auth, postDataController.show, postApiController.show)
router.post('/posts', authorApiController.auth, postDataController.create, postApiController.create)
router.put('/posts/:id', authorApiController.auth, postDataController.update, postApiController.show)
router.delete('/posts/:id', authorApiController.auth, postDataController.destroy, postApiController.destroy)

module.exports = router
