require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');


app.use(session({
    secret: 'AdarshVishwakarma',
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
res.locals.success = req.flash('success')
res.locals.error  = req.flash('error')
next();
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', userRouter)
app.use('/post', postRouter)

app.listen(3000);