const Entries = require('../models/entries');
const moment = require('moment');

exports.showList = (req,res,next)=>{
    let currentPage = parseInt(req.query.page,10) || 1;
    let perpage = 5;
    Entries.count({},function (err,TotalCount) {
        Entries.find().skip( perpage * (currentPage-1) ).limit(perpage)
            .populate({path: 'userId', select: 'name headImg'})
            .sort({'createTime':-1})
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
                        entry['showTime'] = moment(entry['createTime']).format("YYYY-MM-DD HH:mm");
                    });
                }
                console.log(entries);
                res.render('list',{
                    entries:entries,
                    pages:pages
                });
            });
    });

};