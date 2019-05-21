const User = require('../models/user.model');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

var login = function (username, password, done) {
    User.findOne({ 'username': username })
        .then(user => {
            if (user == null) {
                return done(null, false, { message: 'user not found' });
            }
            if (user.password === password) {
                done(null, user);
            } else {
                return done(null, false, { message: 'user not found' });
            }
        })
        .catch(err => {
            return done(err);
        });
}

var signup = function (req,username, password, done) {
    const name = req.body.name;
    console.log(username, password, name);
    const newUser = new User({
        username: username,
        password: password,
        name: name,
    });

    newUser.save()
        .then(() => {
            return done(null,newUser);
        })
        .catch(err => {
            return done(err,false);
        });
}

passport.use('local-login', new LocalStrategy(login));
passport.use('local-signup', new LocalStrategy({ passReqToCallback: true }, signup));

module.exports = passport;