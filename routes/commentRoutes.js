const commentModel = require('../models/commentModel');
exports.getEntryComments = getEntryComments;
exports.publishComment = (req,res)=>{
    let data = req.body;
    let user = req.user;
    let userId = null;
    if(user){
        userId = user  ;
    }
    let comment = new commentModel({
        entry:data.entryId,
        auther:userId._id,
        body:data.body
    });
    comment.save((err)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }
        commentModel.find({entry:data.entryId})
            .populate(['entry','auther'])
            .exec(function (err,comments) {
                if(err) {
                    console.log(err);
                }
                res.render('../includes/commentList.jade',{ commentList: comments }, function(err, html) {
                    res.send(html);
                })
            });

    });

};




function getEntryComments(req,res) {
    let entryId = req.query.entryId;
    commentModel.find({entry:entryId})
        .populate(['entry','auther'])
        .exec(function (err,comments) {
                if(err) {
                    console.log(err);
                }
                res.render('../includes/commentList.jade',{ commentList: comments }, function(err, html) {
                    res.send(html);
                })
            });
}