const userModel = require('../models/userModel');
const { tokenGenerator } = require('../utils/tokenGenerator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            return res.status(400).send('user already exsists')
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
                let token = tokenGenerator(user);
                res.cookie('token', token);
                res.status(201).send('SUCCESS: User created successfully');


            })
        });
    } catch (err) {
        res.send('Signup error: ' + err.message);
    }

}

exports.getLogin = (req, res) => {
    res.render('login')
}

exports.postLogin = (req, res) => {
    let {email, password} = req.body;
    if(!email|| !password){
        return res.status(400).send('All fields are required');
    }
    let user = userModel.findOne({email: email})
    if(!user){
        res.status(400).send("user not found");
    }
    else{
        bcrypt.compare(password, user.password, (err, result) =>{
            if(!result){
                return res.status(400).send('email or password is incorrect');
            }
            else{
                let token = tokenGenerator(user);
                res.cookie('token', token);
                res.status(200).redirect('/home');
            }
        })
    }

}

exports.getLogout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
}