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
  upload.single('image'),  // name="image" in your form
  (req, res, next) => {
    if (req.file) {
        //in upload
      req.body.image = '/uploads/' + req.file.filename;
    }
    next();
  },
  dataController.create,
  viewController.redirectHome
);

// Show edit post form - auth required
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit);

// Show single post details - auth required
router.get('/:id', authDataController.auth, dataController.show, viewController.show);

module.exports = router;
