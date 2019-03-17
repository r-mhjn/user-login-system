const express=require('express');
const hbs=require('hbs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var app=express();

const port=process.env.PORT | 8080;

var uri = require('./config/database');

mongoose.connect(uri, {useNewUrlParser: true});
mongoose.connection.on('error',()=>{
    console.error('error connecting to database');
});

app.set('view engine','hbs');

app.use(express.static(__dirname+'/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app);

app.listen(port,()=>{
	console.log(`server started on port ${port}`);
});
