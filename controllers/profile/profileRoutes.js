// controllers/auth/profileRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../auth/dataController');
const profileController = require('./profileController');
const profileViewController = require('./profileViewController');

// Show profile page - auth required
router.get('/', dataController.auth, profileController.getProfile, profileViewController.show);

// Show edit profile form - auth required
router.get('/edit', dataController.auth, profileViewController.edit);

// Update profile - auth required
router.put('/', dataController.auth, profileController.updateProfile, profileViewController.redirectToProfile);

module.exports = router;