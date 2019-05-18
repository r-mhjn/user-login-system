var user=require('../models/user.model');

module.exports={

    login : (req,res,next)=>{
        user.findOne({'username':req.body.usrname},(err,user)=>{
            if(err){
                console.log('error');
            }
            if(user){
                if(user.password===req.body.passwd){
                    return next();
                }else{
                    console.log('wrong pass');
                    res.redirect('/login');
                }
            }else{
                console.log('wrong usrname');
                return res.redirect('/login');
            }
        });
    },
    signup : (req,res,next)=>{
        current=new user({
            username:req.body.usrname,
            name:req.body.name,
            password:req.body.passwd
        });
        current.save((err)=>{
            if(err){
                console.log('error saving');
            }
        });
        return next();
    },
    checkusername : (req,res)=>{
        res.setHeader('Content-type', 'text/xml');
        user.findOne({'username':req.body.usrname},(err,usr)=>{
            if(err){
                console.log('error');
            }
            if(usr){
                res.send('no');
            }else{
                res.send('ok');
            }
        });
    }
}