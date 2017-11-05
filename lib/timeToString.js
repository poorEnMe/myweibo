/*自动识别，根据相对时间长短选择对应的展示方式
依赖moment.js*/
const moment = require('moment');
moment.locale('zh-cn');

(DateToString = function (date) {
    /*以秒做最小单位
    1、如果在1分钟内，显示为“刚刚”
    2、如果在1小时内，显示为具体分钟数
    3、如果在半天之内，显示具体小时
    4、如果超过半天，直接显示绝对时间*/

    let OneMinute = 60;
    let OneHour = 60 * 60;
    let HalfDay = 60 * 60 * 12;

    let NowTime = new Date();

    let Seconds = (NowTime - date) / 1000 ;
   /* if(Seconds < OneMinute){
        moment(date, "YYYYMMDD").fromNow();
    }*/
    console.log(moment("201711051630", "YYYYMMDDHH").calendar());

})();