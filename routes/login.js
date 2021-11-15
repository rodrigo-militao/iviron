const express = require('express');
const passport = require('passport');
const router = express.Router();

/* GET login page. */
router.get('/', (req, res, next) => {
  if (req.query.fail)
      res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
      res.render('login', { message: false });
});

/* POST login page */
router.post('/',
  passport.authenticate('local', { 
      successRedirect: '/', 
      failureRedirect: '/login?fail=true' 
  })
);

module.exports = router;
