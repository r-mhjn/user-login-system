const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

module.exports=new mongoose.model('Users',UserSchema);