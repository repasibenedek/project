const express = require('express');
const router = express.Router();

// Home Route
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('home', { user: req.user });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
