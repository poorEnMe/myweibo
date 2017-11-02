const commentModel = require('../models/commentModel');

exports.publishComment = (req)=>{
    let data = req.body;
    let user = req.user;
    let userId = null;
    if(user){
        userId = user  ;
    }
    console.log(data.entryId,userId._id,data.body);
    let comment = new commentModel({
        entry:data.entryId,
        auther:userId._id,
        body:data.body
    });
    comment.save((err)=>{
        if(err) {
            console.log(err);
            return false
        }
        return true

    });

};