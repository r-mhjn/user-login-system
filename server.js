const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const hbs = require('hbs');

var app = express();

require('dotenv').config();

const port = process.env.PORT | 8080;

var uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection=mongoose.connection;
connection.once('open', () => {
    console.error('connected to mongodb database successfully');
}).on('error',()=>{
    console.error('error connecting to the database');
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());

const usersRouter=require('./routes/users');
app.use('/',usersRouter);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
