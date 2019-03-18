module.exports=(app)=>{
	var strategy=require('../config/strategy');
	var user;
	app.get('/login',(req,res)=>{
		console.log('login page requested');
		res.redirect('/login_page.html');
	});
	app.get('/',(req,res)=>{
		res.redirect('/login');
	});
	app.get('/signup',(req,res)=>{
		console.log('signup page requested');
		res.redirect('/signup_page.html');
	});
	
	app.post('/login',strategy.login,(req,res)=>{
		user=req.body.usrname;
		res.redirect('/profile');
	});
	app.post('/signup',strategy.signup,(req,res)=>{
		user=req.body.usrname;
		res.redirect('/profile');
	});
	
	app.post('/ajaxcall',strategy.checkusername);

	app.get('/profile',
		//TODO: check if logged in;
		(req,res)=>{
			res.render('profile.hbs',{
				username:user
			});
		});
}
