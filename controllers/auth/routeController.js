const express = require('express');
const router = express.Router();
const dataController = require('./dataController');
const viewController = require('./viewController');
const postsViewController = require('../posts/viewController');

router.post('/', dataController.createAuthor, viewController.redirectToLogin);
router.get('/', viewController.signUp);
router.post('/login', dataController.loginAuthor, postsViewController.redirectHome);
router.get('/login', viewController.signIn);

module.exports = router;
