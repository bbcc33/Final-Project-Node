const express = require('express');
const router = express.Router();
const passport = require('passport');
const poemController = require('../Controllers/poemControllers');
const { isAuthenticated } = require('../Middleware/authMiddleware');

const {
    generatePoem,
    viewPoem,
    getWordForm,
} = require('../Controllers/poemControllers');

// Apply the isAuthenticated middleware to all routes
router.use(isAuthenticated);

router.get('/wordForm', getWordForm);
router.post('/generatePoem', generatePoem);
router.get('/viewPoem/:id', viewPoem);

module.exports = router;