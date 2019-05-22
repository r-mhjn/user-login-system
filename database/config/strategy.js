const User = require('../models/user.model');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const salt = 10;

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

var login = function (username, password, done) {
    if (password.length > 15 || password.length < 5) {
        return done(null, false);
    }
    User.findOne({ 'username': username })
        .then(user => {
            if (user == null) {
                return done(null, false, { message: 'invalid credentials' });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'invalid credentials' });
                }
            });
        })
        .catch(err => {
            return done(err);
        });
}

var signup = function (req, username, password, done) {
    if (password.length > 15 || password.length < 5) {
        return done(null, false);
    }
    const name = req.body.name;
    console.log('recieved ', username, password, name);
    bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
            console.log('error hashing ' + password);
            return done(err, false);
        }
        const newUser = new User({
            username: username,
            password: hashedPassword,
            name: name,
        });

        newUser.save()
            .then(() => {
                return done(null, newUser);
            })
            .catch(err => {
                return done(err, false, { message: 'invalid credentials' });
            });
    });
}

passport.use('local-login', new LocalStrategy(login));
passport.use('local-signup', new LocalStrategy({ passReqToCallback: true }, signup));

module.exports = passport;