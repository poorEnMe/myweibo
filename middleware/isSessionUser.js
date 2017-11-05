const User = require('../models/user');

module.exports = function (req,res,next) {
    if(!req.user){
        return res.redirect('/index');
    }
    next();
};