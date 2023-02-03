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
    slug: {
        type: String,
        unique: true,
        set: function(value) {
            return value.toLowerCase().replace(/\s+/g, '-');
        }
    } 
})

const Article = mongoose.model('articles', articleSchema)

module.exports = Article