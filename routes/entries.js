const Entries = require('../models/entries');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.publishSubmit = (req,res)=>{
    let data = req.body;
    let user = req.user;
    let userId = null;
    if(user){
        userId = user._id;
    }
    let entries = new Entries({
        userId:userId,
        body:data.body,
    });

    entries.save((err)=>{
        if(err) {
            console.log(err);
        }
        if(user){
            res.send(true);
        }else{
            res.send(false);
        }
    });

};

exports.fetch = (req,res,next)=>{
    /*Entries.find()
        .populate('userId','name')
        .exec(function (err,entries) {
            if(err) return next(err);
            console.log(entries);
            res.render('index',{
                entries:entries
            })
        });*/
    Entries.find(function (err,entries) {
            if(err) return next(err);
            entries.forEach(function (entry){
                let _id = mongoose.Types.ObjectId(entry.userId);
                console.log(_id);
                User.findById(_id,function (err,user) {
                    console.log(user);
                    if(err) return next(err);
                    entry.auther = user.name;
                    res.render('index',{
                        entries:entries
                    });

                });
            });
    })
};