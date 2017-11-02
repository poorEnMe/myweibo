const mongoose = require('mongoose');
const users = require('./user');
// const ObjectId = mongoose.Schema.Types.ObjectId;

let date = new Date();

let EntriesSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    body:String,
    createAt:Date,
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

    findById:(id)=>{
        return this.findOne({_id:id});
    }
};

module.exports = EntriesSchema;