const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

try{

    exports.getRegister = (req, res) => {
        res.render('signup')
    }
    
    exports.postRegister = async (req, res) => {
        let { name, username, email, password } = req.body;
    
        if (!name || !username || !email || !password) {
            return res.status(400).send('All fields are required');
        }
        try {
            let existinguser = await userModel.findOne({ email: email })
            if (existinguser) {
                return res.status(400).send('existing user with this email');
            }
    
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        return res.status(400).send('something went wrong');
                    }
                    let user = await userModel.create({
                        name: name,
                        username: username,
                        email: email,
                        password: hash
                    });
                    let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
                    res.cookie('token', token);
                    res.status(201).redirect('post/dashboard');
    
    
                })
            });
        } catch (err) {
            res.send('Signup error: ' + err.message);
        }
    
    }
    
    exports.getLogin = (req, res) => {
        res.render('login')
    }
    
    exports.postLogin = async (req, res) => {
        let { email, password } = req.body;
        
        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send('User not Found');
        }
        else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Internal Server Error');
                }
    
                if (!result) {
                    return res.status(400).send('Email or password is incorrect');
                }
    
    
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    
                res.cookie('token', token);
                res.redirect('/post/dashboard');
            })
    
    
        }
    }
    
    exports.getLogout = (req, res) => {
        res.clearCookie('token');
        res.redirect('/login');
    }
    
    exports.getProfile = async (req, res) => {
        const user = await userModel.findOne({ _id: req.params.userId });
        const posts = await postModel.find({ userId: req.params.userId }).populate('userId', 'username').sort({ date: -1 })
    
        res.render('profile', { user, posts });
    }
    
    exports.getImg = (req, res) => {
        res.render('img', { user: req.user });
    }
    
    exports.postImg = async (req, res) => {
    
        const { name, bio } = req.body;
        let user = await userModel.findOne({ _id: req.params.userId })
    
        const picture = req.file ? /uploads/ + req.file.filename : user.profilepic
    
        await userModel.findOneAndUpdate(
            { _id: user._id },
            {
                username: name,
                bio: bio,
                profilepic: picture
            },
            { new: true }
        )
        await user.save();
    
        res.redirect('/post/dashboard')
    }
}
catch(err){
    console.log(err);
    res.render('error',{message:'Someting went wrong'})
    
exports.getRegister = (req, res) => {
    res.render('signup')
}

exports.postRegister = async (req, res) => {
    let { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    try {
        let existinguser = await userModel.findOne({ email: email })
        if (existinguser) {
            return res.status(400).send('existing user with this email');
        }

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(400).send('something went wrong');
                }
                let user = await userModel.create({
                    name: name,
                    username: username,
                    email: email,
                    password: hash
                });
                let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
                res.cookie('token', token);
                res.status(201).redirect('post/dashboard');


            })
        });
    } catch (err) {
        res.send('Signup error: ' + err.message);
    }

}

exports.getLogin = (req, res) => {
    res.render('login')
}

exports.postLogin = async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email })
    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }
    else {
        
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Internal Server Error');
            }

            if (!result) {
                return res.status(400).send('Email or password is incorrect');
            }


            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

            res.cookie('token', token);
            res.redirect('/post/dashboard');
        })


    }
}

exports.getLogout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
}

exports.getProfile = async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.userId });
    const posts = await postModel.find({ userId: req.params.userId }).populate('userId', 'username').sort({ date: -1 })

    res.render('profile', { user, posts });
}

exports.getImg = (req, res) => {
    res.render('img', { user: req.user });
}

exports.postImg = async (req, res) => {

    const { name, bio } = req.body;
    let user = await userModel.findOne({ _id: req.params.userId })

    const picture = req.file ? /uploads/ + req.file.filename : user.profilepic

    await userModel.findOneAndUpdate(
        { _id: user._id },
        {
            username: name,
            bio: bio,
            profilepic: picture
        },
        { new: true }
    )
    await user.save();

    res.redirect('/post/dashboard')
}
