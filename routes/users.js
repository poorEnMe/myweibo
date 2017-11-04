const User = require('../models/user');


exports.isAlreadyUsed = (req,res)=>{
  let name = req.query.username;
  User.findByName(name,(err,user)=>{
      if(err) console.log(err);
      if(user){
          res.send(true);
      }else{
          res.send(false);
      }
  });
};

exports.registerSubmit = (req,res,next)=>{
  let data = req.body;
  let user = new User({
      name:data.username,
      password:data.userpassword
  });
  user.save((err)=>{
      if(err) return next(err);
      req.session.uid = user.id;
      res.redirect('/index');
  });

};

exports.loginCheck = (req,res,next)=>{
    let data = req.body;
    User.authenticate(data.username,data.userpassword,function (err,user) {
        if (err) return next(err);
        if(user){
            res.send(true);
        }else{
            res.send(false);
        }
    })
};

exports.loginSubmit = (req,res,next)=>{
    let data = req.body;
    User.authenticate(data.username,data.userpassword,function (err,user) {
        if(err) return next(err);
        if(user){
            req.session.uid = user.id;
            res.redirect('/index');
        }
    });
};
exports.isLogin = (req,res)=>{
    if(req.user){
        res.send(req.user);
    }else{
        res.send(false);
    }


};


exports.logout = (req,res)=>{
    req.session.destroy(function (err) {
        if(err) throw  err;
        res.redirect('/index');
    })
};



/*


exports.form = (req,res)=>{
    res.render('data',{title:'data'});
};

exports.submit = function (req,res,next) {
    console.log(req.body);
    let account = req.body.account;
    let password = req.body.password;
    if(!account || !password)return next(function () {
        throw new Error('账号密码必填');
    });
    User.getByAccount(account,(err,user)=>{
        console.log(user);
        if(user){
            req.session.id = user.id;
            return res.jsonp(user);
        }

        next();
    });
};*/
