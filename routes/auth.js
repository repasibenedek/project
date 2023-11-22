const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Register Form
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Register Logic
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Add validation logic here...

  const newUser = new User({ username, email });
  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error(err);
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

// Login Form
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
      // Kijelentkezés utáni műveletek
      res.redirect('/');
    });
  });

module.exports = router;
