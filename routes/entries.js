const Entries = require('../models/entries');
const commentModel = require('../models/commentModel');
exports.publishSubmit = (req,res)=>{
    let data = req.body;
    let user = req.user;
    let userId = null;
    if(user){
        userId = user  ;
    }
    let entries = new Entries({
        userId:userId._id,
        body:data.body,
    });
    entries.save((err)=>{
        if(err) {
            console.log(err);
            return false
        }
        return true
    });

};

exports.fetch = (req,res,next)=>{
    Entries.find()
        .populate('userId','name')
        .exec(function (err,entries) {
            if(err) return next(err);
            commentModel.findByEntry(entries._id,(err,comments)=>{
                if (err) return next(err);
                console.log(comments);
                res.render('index',{
                    entries:entries,
                    comments:comments
                });
            });
        });

};
