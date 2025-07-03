const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/twitterClone')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));




app.use('/', userRouter)
app.use('/post', postRouter)

app.listen(3000);