var express = require('express');
var router = express.Router();
const Article = require('../models/articles')
const User = require('../models/users')


//Get tags

router.get('/PopularTags', (req, res) => {
  fetch('https://api.realworld.io/api/tags')
  .then(response => response.json())
  .then(apiData => {
    if(JSON.stringify(apiData.tags) !== '{}') {
      res.json({tags: apiData.tags})
    } else {
      res.json({error: 'no data found'})
    }
  })
})

module.exports = router;
