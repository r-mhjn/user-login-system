const router = require('express').Router();
const passport = require('../database/config/strategy');
const User = require('../database/models/user.model');


//routes
router.route('/').get((req, res) => {
	res.redirect('/login');
});

router.route('/login').get(userIsAuthenticated, (req, res) => {
	res.render('login', {
		message: req.flash('error')
	});
});

router.route('/signup').get(userIsAuthenticated, (req, res) => {
	res.render('signup', {
		message: req.flash('error')
	});
});

router.route('/login').post(userIsAuthenticated, passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

router.route('/signup').post(userIsAuthenticated, passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.route('/logout').get((req, res) => {
	req.logOut();
	res.redirect('/');
})

router.route('/ajaxcall').post((req, res) => {
	res.setHeader('Content-type', 'text/xml');
	const username = req.body.username;
	User.findOne({ username: username })
		.then(user => {
			if (user == null) { res.send('ok'); }
			else {
				res.send('no');
			}
		})
		.catch(err => {
			res.send('ok');
		})
});

router.route('/profile').get((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}, (req, res) => {
	res.render('profile.hbs', {
		username: req.user.username
	});
});

function userIsAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/profile');
	} else {
		next();
	}
}

module.exports = router;