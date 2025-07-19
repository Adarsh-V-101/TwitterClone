const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    profilepic:{
        type: String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
})

module.exports = mongoose.model('User', userSchema)