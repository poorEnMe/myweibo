const commentModel = require('../models/commentModel');
const messageModel = require('../models/messageModel');
const entriesModel = require('../models/entries');
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
    //存储评论
    comment.save((err)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }
        commentModel.find({entry:data.entryId})
            .populate(['entry','auther'])
            .sort({'createTime':-1})
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
    //存储动态，推送给原微博发布者
    //type:1 代表评论
    entriesModel.find({_id:data.entryId},(err,entry)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }
        console.log(entry[0]);
        let message = new messageModel({
            entry:data.entryId,
            auther:userId._id,
            messageTo:entry[0].userId,
            body:data.body,
            type:1
        });
        message.save((err)=>{
            if(err) {
                console.log(err);
                res.send(err);
            }
        });
    });




};

function getEntryComments(req,res) {
    let entryId = req.query.entryId;
    commentModel.find({entry:entryId})
        .populate(['entry','auther'])
        .sort({'createTime':-1})
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
        if(DateNow - comment['createTime'] <= 1000 * 60 * 60 * 12){
            comment['showTime'] = moment(comment['createTime']).fromNow();
        }else{
            comment['showTime'] = moment(comment['createTime']).calendar();
        }
    });
    return comments;
}