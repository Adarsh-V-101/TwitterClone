const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

exports.dashboard = async (req , res) =>{
    const posts = await postModel.find().populate('userId').sort({date: -1});
    res.render('dashboard', {user: req.user, posts: posts})
    
}

exports.createPost = async (req, res) => {
    let {content} = req.body;
    const user = await userModel.findOne({_id: req.user._id});
    
     const post = await postModel.create({
        userId: req.user._id,
        content: content,
    })
    console.log(post._id);
    user.posts.push(post._id);
    await user.save();
    
    
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

exports.getFollow = async (req, res) =>{
    const user = await userModel.findOne({_id: req.params.followerId});
    const post = await postModel.findOne({_id: req.params.postId}).populate('userId', 'followers');
    
    if(post.userId.followers.includes(user._id)){
        post.userId.followers.pull(user._id);
        await post.userId.save();
    }else{
        post.userId.followers.push(user._id);
        await post.userId.save();
    }
    res.redirect('/post/dashboard');
}