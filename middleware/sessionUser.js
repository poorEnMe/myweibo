const User = require('../models/user');

module.exports = function (req,res,next) {
    let uid = req.session.uid;
    if(!uid) return next();
    User.findById(uid,function (err,user) {
        if(err) return next(err);
        req.user = res.locals.user = {
            name:user.name,
            headImg:user.headImg,
            _id:user._id
        };
        next();
    })
};