const entries = require('./routes/entries');
const user = require('./routes/users');
const comment = require('./routes/commentRoutes');



module.exports = (app)=>{
    app.get('/index',entries.fetch);

    app.get('/register',(req,res)=>{
        res.render('register',{
            title:"注册"
        });
    });
    app.get('/register/isAlreadyUsed',user.isAlreadyUsed);
    app.post('/register',user.registerSubmit);

    app.get('/login',(req,res)=>{
        res.render('login',{
            title:"登录"
        });
    });
    app.post('/login/check',user.loginCheck);
    app.post('/login',user.loginSubmit);

    app.get('/logout',user.logout);

    app.post('/publish',entries.publishSubmit);


    app.get('/getEntrylist',comment.getEntryComments);
    app.post('/publishComment',comment.publishComment);



    app.get('/list',(req,res)=>{
        res.render('list',{
            title:"列表"
        });
    });

    app.get('/info',(req,res)=>{
        res.render('info',{
            title:"个人信息"
        });
    });


};

