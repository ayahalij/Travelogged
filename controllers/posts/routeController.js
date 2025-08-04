const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Save to public/uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1723472839182.png
  }
});

const upload = multer({ storage: storage });

const viewController = require('./viewController');
const dataController = require('./dataController');
const authDataController = require('../auth/dataController');

// Show all posts - auth required
router.get('/', authDataController.auth, dataController.index, viewController.index);

// Show new post form - auth required
router.get('/new', authDataController.auth, viewController.newView);

// Delete a post - auth required
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome);

// Update a post - auth required
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow);

// Create a new post - auth + multer upload
router.post(
  '/',
  authDataController.auth,
  upload.single('imageUrl'),  // name="image" in your form
  (req, res, next) => {
    if (req.file) {
      req.body.imageUrl = '/uploads/' + req.file.filename;  // use imageUrl to match your schema
    }
    next();
  },
  dataController.create,
  viewController.redirectHome
);

// Toggle Like on a post - auth required
router.post('/:id/toggle-like', authDataController.auth, dataController.toggleLike, (req, res) => {
  // Redirect back to the post page after toggling like
  res.redirect(`/posts/${req.params.id}`);
});

// Show edit post form - auth required
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit);

// Show single post details - auth required
router.get('/:id', authDataController.auth, dataController.show, viewController.show);

// No need to import Comment model since we're using embedded comments
// Create a comment
router.post('/:id/comments', authDataController.auth, dataController.createComment, (req, res) => {
  res.redirect(`/posts/${req.params.id}`);
});

// Delete a comment
router.delete('/:postId/comments/:commentId', authDataController.auth, dataController.deleteComment, (req, res) => {
  res.redirect(`/posts/${req.params.postId}`);
});

module.exports = router;