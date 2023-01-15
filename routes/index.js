var express = require('express');
var router = express.Router();
const Article = require('../models/articles')
const User = require('../models/users')
//Get articles


router.get('/articles', (req, res) => {
  Article.find({}).populate('author', 'bio image username').then(data => {
    console.log(JSON.stringify(data))
    if(JSON.stringify(data) !== '{}') {
      res.json({articles: data})
    } else {
      res.json({error: 'no data found'})
    }
  })
})


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
