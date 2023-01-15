const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    token: String,
    username: String,
    email: String,
    password: String,
    canBookmark: Boolean,
    bio: String,
    image: String,
})

const User = mongoose.model('users', userSchema)

module.exports = User