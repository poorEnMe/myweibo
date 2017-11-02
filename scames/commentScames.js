const mongoose = require('mongoose');

let date = new Date();

let CommentSchema = new mongoose.Schema({
    entry:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'entries'
    },
    //评论发起人
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    //针对哪条评论，如果为空，则为评论原微博
    commentTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments'
    },
    body:String,
    createAt:Date,
    updateAt:Date
});

CommentSchema.pre('save',(next)=>{
    if(this.isNew){
        this.createAt = this.updateAt = date.toUTCString();
    }else{
        this.createAt = date.toUTCString();
    }
    next();
});

CommentSchema.statics ={

    findById:function(id){
        return this.findOne({_id:id});
    },
    findByEntry:function(entryId,cb){
        return this.find({entry:entryId},(err,result)=>{
            if(err) return cb(err);
            cb(null,result);
        });
    }
};

module.exports = CommentSchema;