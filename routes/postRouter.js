const express = require('express');
const router = express.Router();
const userController = require('../controller/postController')
const isLoggedin = require('../middleware/isLoggedin');

router.get('/dashboard', isLoggedin, userController.dashboard);
router.post('/create', isLoggedin, userController.createPost)

module.exports = router;