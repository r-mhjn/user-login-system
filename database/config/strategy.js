const User = require('../models/user.model');

var login = function (body, callback) {
    const username = body.username;
    const password = body.password;

    User.findOne({ 'username': username })
        .then(user => {
            if (user.password === password) {
                callback(user, undefined);
            } else {
                callback(undefined, 'error');
            }
        })
        .catch(err => {
            callback(undefined, err);
        });
}

var signup = function (body, callback) {
    const username = body.username;
    const password = body.password;
    const name = body.name;
    console.log(username,password,name);
    const newUser = new User({
        username: username,
        password: password,
        name: name,
    });

    newUser.save()
        .then(() => {
            callback(newUser, undefined);
        })
        .catch(err => {
            callback(undefined, err)
        });
}

var checkusername=function(body,callback){
    const username=body.username;
    User.findOne({username:username})
    .then(user=>{
        if(user==null){callback(undefined,err)}
        callback(user,undefined);
    })
    .catch(err=>{
        callback(undefined,err);
    })
}

module.exports = {
    login,
    signup,
    checkusername
}