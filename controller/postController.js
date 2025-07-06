const postModel = require('../models/postModel');

exports.dashboard = async (req , res) =>{
    const posts = await postModel.find().populate('userId', 'username').sort({Date: -1})
    res.render('dashboard', {user: req.user, posts: posts})

}

exports.createPost = async (req, res) => {
    let {content} = req.body;
    
     await postModel.create({
        userId: req.user._id,
        content: content,
    })
    res.redirect('/post/dashboard');
}