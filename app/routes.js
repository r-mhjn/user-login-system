module.exports=(app)=>{
	var strategy=require('../config/strategy');
	var user;
	app.get('/login',(req,res)=>{
		console.log('login page requested');
		res.render('login_page.hbs');
	});
	app.get('/',(req,res)=>{
		res.redirect('/login');
	});
	app.get('/signup',(req,res)=>{
		console.log('signup page requested');
		res.render('signup_page.hbs');
	});
	
	app.post('/login',strategy.login,(req,res)=>{
		//console.log(req.body);
		user=req.body.usrname;
		//console.log(`${user} tried login`);
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
