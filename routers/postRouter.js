const express = require('express');
const router = express.Router();
const userController = require('../controller/postController')
const isLoggedin = require('../middleware/isLoggedin');


router.get('/dashboard', isLoggedin, userController.dashboard);
router.get('/like/:postId', isLoggedin, userController.likePost);
router.get('/follow/:followerId/:postId', isLoggedin, userController.getFollow);
router.post('/create', isLoggedin, userController.createPost);

module.exports = router;