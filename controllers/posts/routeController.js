const express = require('express');
const router = express.Router();
const viewController = require('./viewController');
const dataController = require('./dataController');
const auth = require('../../middleware/auth'); // Add this line

// Update all routes to use auth middleware
router.get('/', auth, dataController.index, viewController.index);
router.get('/new', auth, viewController.newView);
router.delete('/:id', auth, dataController.destroy, viewController.redirectHome);
router.put('/:id', auth, dataController.update, viewController.redirectShow);
router.post('/', auth, dataController.create, viewController.redirectHome);
router.get('/:id/edit', auth, dataController.show, viewController.edit);
router.get('/:id', auth, dataController.show, viewController.show);

module.exports = router;