const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    text: {type: String, required: true}
});


const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;