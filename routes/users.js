const router = require('express').Router();
const strategy = require('../database/config/strategy');

var currentuser;

//routes
router.route('/').get((req, res) => {
	res.redirect('/login.html');
});

router.route('/login').post((req,res)=>{
	strategy.login(req.body,(user,err)=>{
		if(err){
			//add flash message username.password incorrect
			res.redirect('/login.html');
		}else{
			currentuser=user.username;
			res.redirect('/profile');
		}
	});
});

router.route('/signup').post((req, res) => {
	strategy.signup(req.body,(user,err)=>{
		if(err){
			//add flash message
			res.redirect('/signup.html');
		}else{
			currentuser=user.username;
			res.redirect('/profile');
		}
	});
});

router.route('/ajaxcall').post((req,res)=>{
	strategy.checkusername(req.body,(user,err)=>{
		res.setHeader('Content-type', 'text/xml');
		if(err){
			res.send('ok');
		}else{
			res.send('no');
		}
	})
});

//TODO: check if logged in;
router.route('/profile').get((req, res) => {
	res.render('profile.hbs', {
		username: currentuser
	});
});

module.exports=router;