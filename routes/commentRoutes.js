const commentModel = require('../models/commentModel');
const moment = require('moment');
moment.locale('zh-cn');

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
                if(comments.length>0){
                    comments = updateShowDate(comments);
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
                if(comments.length>0){
                    comments = updateShowDate(comments);
                }
                res.render('../includes/commentList.jade',{ commentList: comments }, function(err, html) {
                    res.send(html);
                })
            });
}

function updateShowDate(comments) {
    comments.forEach(function(comment){
        let DateNow = new Date();
        //超出半天显示绝对时间
        if(DateNow - comment['createTime'] <= 60 * 60 * 12){
            comment['showTime'] = moment(comment['createTime']).fromNow();
        }else{
            comment['showTime'] = moment(comment['createTime']).calendar();
        }
    });
    return comments;
}