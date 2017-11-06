const mongoose = require('mongoose');

let MessageScames = new mongoose.Schema({
    //围绕的主体
    entry:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Entries'
    },
    //新动态发起人
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    //针对哪条评论，如果为空，则为评论原微博
    messageTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },

    body:String,
    createTime:{
        type:Date,
        default:Date.now
    },
    showTime:String,
    //type:1 代表评论
    type:Number,
    hasRead:{
        type:Boolean,
        default:false
    }
});


MessageScames.statics ={

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

module.exports = MessageScames;