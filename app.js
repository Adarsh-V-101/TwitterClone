const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();


mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/twitterClone')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));




app.use('/', userRouter)
app.use('/post', postRouter)

app.listen(3000);