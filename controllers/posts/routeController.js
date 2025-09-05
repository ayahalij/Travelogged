const express = require('express')
const router = express.Router()
const multer = require('multer')
const { storage } = require('../../config/cloudinary')
const upload = multer({ storage })

const viewController = require('./viewController')
const dataController = require('./dataController')
const authDataController = require('../auth/dataController')

// Show all posts
router.get('/', authDataController.auth, dataController.index, viewController.index)

// New post form
router.get('/new', authDataController.auth, viewController.newView)

// Create a new post
router.post(
  '/',
  authDataController.auth,
  upload.single('image'), // name matches form field
  dataController.create,
  viewController.redirectHome
)

// Show single post
router.get('/:id', authDataController.auth, dataController.show, viewController.show)

// Edit post form
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit)

// Update post
router.put('/:id', authDataController.auth, upload.single('image'), dataController.update, viewController.redirectShow)

// Delete post
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome)

// Toggle like
router.post('/:id/toggle-like', authDataController.auth, dataController.toggleLike, (req, res) => {
  res.redirect(`/posts/${req.params.id}`)
})

// Comments
router.post('/:id/comments', authDataController.auth, dataController.createComment, (req, res) => {
  res.redirect(`/posts/${req.params.id}`)
})

router.delete('/:postId/comments/:commentId', authDataController.auth, dataController.deleteComment, (req, res) => {
  res.redirect(`/posts/${req.params.postId}`)
})

module.exports = router
