const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getWordForm, generatePoem, viewPoem } = require('../Controllers/poemControllers');

router.get('/wordForm', getWordForm);
router.post('/generatePoem', generatePoem);
router.get('/viewPoem/:id', viewPoem);

module.exports = router;
