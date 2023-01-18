var express = require('express');
var router = express.Router();
const Article = require('../models/articles')
const User = require('../models/users')
const Comment = require('../models/comments')



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

  


module.exports = router;