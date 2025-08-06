// controllers/user/userRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../auth/dataController');
const profileController = require('../profile/profileController');
const profileViewController = require('../profile/profileViewController');

// Show public profile - auth optional (anyone can view)
router.get('/:userId', dataController.optionalAuth, profileController.getPublicProfile, profileViewController.showPublic);

console.log('optionalAuth:', typeof dataController.optionalAuth);
console.log('getPublicProfile:', typeof profileController.getPublicProfile);
console.log('showPublic:', typeof profileViewController.showPublic);

module.exports = router;