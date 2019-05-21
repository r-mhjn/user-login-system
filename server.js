const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash-plus');

var app = express();

require('dotenv').config();

const port = process.env.PORT | 8080;

var uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.error('connected to mongodb database successfully');
}).on('error', () => {
    console.error('error connecting to the database');
});

app.set('view engine', 'hbs');

app.use(morgan('tiny'));
app.use(flash());
app.use(express.static(__dirname + '/views'));
app.use(session({
    secret: 'meri key',
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const usersRouter = require('./routes/users');
app.use('/', usersRouter);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
