const Entries = require('../models/entries');
exports.publishSubmit = (req,res)=>{
    let data = req.body;
    let user = req.user;
    let userId = null;
    if(user){
        userId = user  ;
    }
    let entries = new Entries({
        userId:userId._id,
        body:data.body,
    });
    entries.save((err)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.send(true);
    });

};

exports.fetch = (req,res,next)=>{
    let currentPage = parseInt(req.query.page,10) || 1;
    let perpage = 1;
    Entries.count({},function (err,TotalCount) {
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
                console.log(pages);
                res.render('index',{
                    entries:entries,
                    pages:pages
                });
            });
    });

};
