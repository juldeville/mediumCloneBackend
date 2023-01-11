var express = require('express');
var router = express.Router();

const User = require('../models/users')
const { checkBody } = require('../modules/checkBody')
const uid2 = require('uid2');
const bcrypt = require('bcrypt')

/* Sign up new user */

/* Check for missing fields */
router.post('/signup', (req, res) => {
if (!checkBody(req.body, ['username', 'email', 'password'])) {
  res.json({result: false, error: 'Missing or empty fields'})
  return
}

//Check if the user has not already been registered
User.findOne({email: req.body.email}).then(data => {
  if (data === null) {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      canBookmark: true,
      token: uid2(32)
    });

    newUser.save().then(newDoc => {
      res.json({result: true, token: newDoc.token})
    })
  } else {
    //User already exists
    res.json({result: false, error: 'User already exists'})
  }
})
})

//Sign in new user

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password',])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({result: true, token: data.token})
    } else {
      res.json({result: false, error: 'User not found or wrong password'})
    }
  })
})
module.exports = router;
