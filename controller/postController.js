const postModel = require('../models/postModel');

exports.dashboard = async (req , res) =>{
    const posts = await postModel.find().populate('userId', 'name').sort({Date: -1})
    res.render('dashboard', {user: req.user, posts: posts})

}

exports.createPost = async (req, res) => {
    let {content} = req.body;
    let creaedPost = await postModel.create({
        userId: req.user._id,
        content: content,
    })
    res.redirect('/dashboard');
}