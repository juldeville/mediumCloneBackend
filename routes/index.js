var express = require('express');
var router = express.Router();

//Get articles

router.get('/articles', (req, res) => {
  fetch('https://api.realworld.io/api/articles?limit=197&offset=0')
  .then(response => response.json())
  .then(apiData => {
    if(JSON.stringify(apiData.articles) !== '{}') {
      res.json({articles: apiData.articles})
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
