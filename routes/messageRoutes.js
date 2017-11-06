const messageModel = require('../models/messageModel');
const moment = require('moment');
moment.locale('zh-cn');

//exports.getmessage = getmessage;

//动态只能由评论触发

/*

function getmessage(req,res) {
    let userId = req.user._Id;
    messageModel.find({messageTo:userId})
        .populate([{
            path: 'author',
            select: 'name headImg'
        },{
            path: ''
        }])
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
}*/
