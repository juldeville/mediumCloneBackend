const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    date_published: Date,
    description: String,
    content: String,
    image: String,
    likes: Number,
    tags: [String],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
})

const Article = mongoose.model('articles', articleSchema)

module.exports = Article