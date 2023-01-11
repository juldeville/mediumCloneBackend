var express = require('express');
var router = express.Router();

//Get articles

router.get('/articles', (req, res) => {
  fetch('https://api.realworld.io/api/articles')
  .then(response => response.json())
  .then(apiData => {
    if(JSON.stringify(apiData.articles) !== '{}') {
      res.json({articles: apiData.articles})
    } else {
      res.json({error: 'no data found'})
    }
  })
})

module.exports = router;
