const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    text: {type: String, required: true}
});

const commentsSchema = new mongoose.Schema({
    comments: [commentSchema]
});

const Comment = mongoose.model('comments', commentsSchema);

module.exports = Comment;