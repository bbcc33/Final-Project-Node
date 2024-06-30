const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControllers = require('../Controllers/userControllers');
const poemControllers = require('../Controllers/poemControllers');
const poemUser = require('../Models/User');

// User Registration Routes
router.get('/register', userControllers.getRegister);
router.post('/register', userControllers.postRegister);

// User Login Routes
router.get('/logon', userControllers.getLogon);
router.post("/logon",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/logon",
      failureFlash: true,
    })
);

router.post('/logout', userControllers.postLogout);

module.exports = router;