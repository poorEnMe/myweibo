const Entries = require('../models/entries');
const User = require('../models/user');
const moment = require('moment');
moment.locale('zh-cn');

exports.fetchByName = (req,res,next)=>{
    let currentPage = parseInt(req.query.page,10) || 1;
    let perpage = 5;
    let username = req.params.username;
    User.findByName(username,function (err,user) {
        if(!user){
            res.redirect('/index');
        }else{
            Entries.count({userId:user._id},function (err,TotalCount) {
                Entries.find({userId:user._id}).skip( perpage * (currentPage-1) ).limit(perpage)
                    .sort({'createTime':-1})
                    .populate('userId','name headImg')
                    .exec(function (err,entries) {
                        let pages = {
                            currentPage:currentPage,
                            perpage:perpage,
                            TotalCount:TotalCount,
                            TotalPages:Math.ceil(TotalCount / perpage)
                        };
                        if(err) return next(err);
                        if(entries.length>0){
                            entries.forEach(function(entry){
                                let DateNow = new Date();
                                //超出半天显示绝对时间
                                if(DateNow - entry['createTime'] <= 1000 * 60 * 60 * 12){
                                    entry['showTime'] = moment(entry['createTime']).fromNow();
                                }else{
                                    entry['showTime'] = moment(entry['createTime']).format("YYYY-MM-DD HH:mm");
                                }

                            });
                        }
                        res.render('info',{
                            userInfo:user,
                            entries:entries,
                            pages:pages
                        });
                    });
            });
        }


    });



    /*Entries.count({username},function (err,TotalCount) {
        Entries.find().skip( perpage * (currentPage-1) ).limit(perpage)
            .populate('userId','name')
            .exec(function (err,entries) {
                let pages = {
                    currentPage:currentPage,
                    perpage:perpage,
                    TotalCount:TotalCount,
                    TotalPages:Math.ceil(TotalCount / perpage)
                };
                if(err) return next(err);
                res.render('index',{
                    entries:entries,
                    pages:pages
                });
            });
    });*/

};
