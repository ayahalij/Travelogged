
const express = require('express')
const router = express.Router()
const viewController = require('./viewController')
const dataController = require('./dataController')
const authDataController = require('../auth/dataController')

// Show all posts - auth required
router.get('/', authDataController.auth, dataController.index, viewController.index)

// Show new post form - auth required
router.get('/new', authDataController.auth, viewController.newView)

// Delete a post - auth required
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome)

// Update a post - auth required
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow)

// Create a new post - auth required
router.post('/', authDataController.auth, dataController.create, viewController.redirectHome)

// Show edit post form - auth required
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit)

// Show single post details - auth required
router.get('/:id', authDataController.auth, dataController.show, viewController.show)

module.exports = router

