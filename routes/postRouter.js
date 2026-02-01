const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')
const isLoggedin = require('../middleware/isLoggedin');


router.get('/dashboard', isLoggedin, postController.dashboard);
router.get('/like/:postId', isLoggedin, postController.likePost);
router.get('/follow/:followerId/:postId', isLoggedin, postController.getFollow);
router.post('/create', isLoggedin, postController.createPost);
router.post('/delete/:postId', isLoggedin, postController.deletePost);

module.exports = router;