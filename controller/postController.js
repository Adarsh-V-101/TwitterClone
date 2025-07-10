const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

exports.dashboard = async (req , res) =>{
    const posts = await postModel.find().populate('userId','username').sort({date: -1});
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

exports.likePost = async (req, res) => {
const postId = req.params.postId;
const userId = req.user._id;
const post = await postModel.find({_id: postId})



if(post[0].likes.includes(userId)){
    post[0].likes.pull(userId);
    await post[0].save();
}else{
    post[0].likes.push(userId);
    await post[0].save();
}


res.redirect('/post/dashboard');
}