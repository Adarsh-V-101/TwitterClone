const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/twitterClone')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

})

module.exports = mongoose.model('User', userSchema)