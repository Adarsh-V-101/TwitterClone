const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: String,
    content: String,
    date:{
        type: Date,
        default: Date.now
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('post', postSchema)