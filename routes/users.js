const router = require('express').Router();
const strategy = require('../database/config/strategy');

var user;

//routes
router.route('/login').get((req, res) => {
	console.log('login page requested');
	res.redirect('/login_page.html');
});
router.route('/').get((req, res) => {
	res.redirect('/login');
});
router.route('/signup').get((req, res) => {
	console.log('signup page requested');
	res.redirect('/signup_page.html');
});

router.route('/login').post(strategy.login, (req, res) => {
	user = req.body.usrname;
	res.redirect('/profile');
});
router.route('/signup').post(strategy.signup, (req, res) => {
	user = req.body.usrname;
	res.redirect('/profile');
});

router.route('/ajaxcall').post(strategy.checkusername);

//TODO: check if logged in;
router.route('/profile').get((req, res) => {
	res.render('profile.hbs', {
		username: user
	});
});

module.exports=router;