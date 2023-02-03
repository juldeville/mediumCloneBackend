var express = require('express');
var router = express.Router();
const Article = require('../models/articles')
const User = require('../models/users')
const Comment = require('../models/comments');
const { application } = require('express');
const { checkBody } = require('../modules/checkBody')

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
  

//Get Article

router.get('/article/:id', (req, res) => {
    Article.findById(req.params.id).populate('author', 'bio image username').then(data => {
        if (data) {
            res.json({result: true, article: data})
        } else {
            res.json({ result: false, error: 'article not found'})
        }
    })
})

//get Top Articles

router.get('/topArticles', (req, res) => {
    Article.find().sort({likes: -1}).limit(6).populate('author', 'bio image username').then(data => {
        if(JSON.stringify(data) !== '{}') {
            res.json({articles: data})
        } else {
            res.json({error: 'no data found'})
        }
    })
})
//Update Articles ID

router.put('/updateArticles', (req, res) => {
    Article.updateMany({'author.username': {$eq: 'jdoe'}}, {$set: {author: '63c368a126064ca1652c7b11' }}, function(err, doc) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(doc);
        }
    });
});

//Add Articles

router.post('/addArticle', (req, res) => {
    if (!checkBody(req.body, ['title', 'author', 'date_published', 'description', 'content', 'image', 'likes', 'tags'])) {
      res.json({result: false, error: 'Missing or empty fields'})
      return
    }

    Article.findOne({title: req.body.title}).then(data => {
        if (data === null) {
            const {title, author, date_published, description, content, image, likes, tags, slug} = req.body
            const newArticle = new Article({
                title,
                author,
                date_published,
                description,
                content,
                image,
                likes,
                tags: tags.split(',').map(tag => tag.trim()),
                slug
            })

            newArticle.save().then(newDoc => {
                res.json({result: true})
            })
        } else {
            res.json({result: false, error: 'invalid article'})
        }
    })
  })

// add Comment

router.post('/comments/:article', (req, res) => {
    User.findOne({ token: req.body.token }).then(data => {
        if (data) {
            const newComment = new Comment({
                username: data.username,
                text: req.body.text
            });
            newComment.save().then(newDoc => {
                Article.findByIdAndUpdate(req.params.article, { $push: { comments: newDoc._id } }).then((article) => {
                    res.json({ result: true, comment: newDoc, article });
                });
            });
        }
    });
});


//get top 10 popular tags

router.get('/toptags', (req, res) => {
    Article.aggregate([
        {$unwind: '$tags'},
        {$group: {_id: '$tags', count: {$sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 10}
    ])
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.status(500).json({error})
    })
})

//get articles by tag

router.get('/getArticlesByTag/:tag', (req, res) => {
    const tag = req.params.tag
    Article.find({tags: tag}).populate('author', 'bio image username')
    .then(data => {
        if (data.length>0){ 
        res.json({result: true, articles: data})
    } else {
        res.json({result: false})
    }
    })
})
  


module.exports = router;