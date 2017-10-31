const mongoose = require('mongoose');
const users = require('./user');
// const ObjectId = mongoose.Schema.Types.ObjectId;

let date = new Date();

let EntriesSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        rel:'users'
    },
    userId:String,
    auther:String,
    body:String,
    createAT:Date,
    updateAt:Date
});

EntriesSchema.pre('save',(next)=>{
    if(this.isNew){
        this.createAt = this.updateAt = date.toUTCString();
    }else{
        this.createAt = date.toUTCString();
    }
    next();
});

EntriesSchema.statics ={

    findById:(id,cb)=>{
        return this.findOne({_id:id});
    }
};

module.exports = EntriesSchema;