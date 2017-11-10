const entries = require('./routes/entries');
const user = require('./routes/users');
const comment = require('./routes/commentRoutes');
const info = require('./routes/info');
const isSessionUser = require('./middleware/isSessionUser');
const list = require('./routes/list');

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
    app.get('/isLogin',user.isLogin);
    app.get('/logout',user.logout);

    app.post('/publish',entries.publishSubmit);


    app.get('/getEntrylist',comment.getEntryComments);
    app.post('/publishComment',comment.publishComment);



    app.get('/list',list.showList);

    app.get('/info/:username',info.fetchByName);
    app.get('/headupload',(req,res)=> {
        res.render('headUpload', {
            title: "登录"
        });
    });
    app.post('/headupload',isSessionUser,user.headUpload);


    app.get('/ball',function (req,res) {
        res.render('../sthIntersting/MoveBall');
    })

};

