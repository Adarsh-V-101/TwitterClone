const express = require('express');
const router = express.Router();
const isLoggedin = require('../middleware/isLoggedin');
const upload = require('../middleware/multerconfig');
const userController = require('../controller/userController')

router.get('/', (req, res) => {
    res.redirect('/post/dashboard');
});

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/logout', userController.getLogout);

router.get('/profile/:userId',isLoggedin, userController.getProfile);
router.get('/img',isLoggedin, userController.getImg);
router.post('/img/:userId',upload.single('profilePic'), userController.postImg);

module.exports = router;