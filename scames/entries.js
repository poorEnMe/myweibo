const mongoose = require('mongoose');
const users = require('./user');


let date = new Date();

let EntriesSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    body:String,
    createTime:{
        type:Date,
        default:Date.now
    },
    showTime:String
});

/*EntriesSchema.pre('save',(next)=>{
    if(this.isNew){
        this.createAt = this.updateAt = date.toUTCString();
    }else{
        this.createAt = date.toUTCString();
    }
    next();
});*/

EntriesSchema.statics ={

    findById:(id)=>{
        return this.findOne({_id:id});
    }
};

module.exports = EntriesSchema;