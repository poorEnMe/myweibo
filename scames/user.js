const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let date = new Date();
let UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    salt:String
});

UserSchema.pre('save',function(next){
    let user = this;

    bcrypt.genSalt(12,function (err,salt) {
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function (err,hash) {
            if(err) return next(err);
            user.password = hash;
            user.salt = salt;
            next();
        })
    });


});

UserSchema.statics ={
    fetch:function(cb){
        this.find(function(error, result){
            if(error) return cb(error);
            cb(null,result);
        }).sort('meta.updataAt');
    },
    findById:function(Id,cb){
        this.findOne({_id:Id}, function(err, user){
            if (err) return cb(err);
            cb(null,user);
        });
    },
    findByName:function(name,cb){
        this.findOne({name:name}, function(err, user){
            if (err) return cb(err);
            cb(null,user);
        });
    },

    //认证，如果认证通过，返回user对象
    authenticate:function (name,password,cb) {
        this.findOne({name:name}, function(err, user){
            if (err) return cb(err);
            if(!user) return cb();
            bcrypt.hash(password,user.salt,function (err,hash) {
                if(err) return cb(err);
                if(hash === user.password) return cb(null,user);
                cb();
            })
        });
    }

};

module.exports = UserSchema;
