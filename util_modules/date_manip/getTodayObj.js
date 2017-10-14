/**
 * Created by Myown on 2017-07-17.
 */

var getTodayObj = function(dateObj){
    var date = new Date(dateObj);
    var yyyy = date.getUTCFullYear();
    var mm = date.getUTCMonth() + 1;
    var dd = date.getUTCDate();
    var h = date.getUTCHours();
    var m = date.getUTCMinutes();

    var str_yyyy = yyyy.toString();
    var str_mm;
    if(mm < 10){
        str_mm = "0" + mm.toString();
    }
    else{
        str_mm = mm.toString();
    }
    var str_dd;
    if(dd < 10){
        str_dd = "0" + dd.toString();
    }
    else{
        str_dd = dd.toString();
    }

    var ret = new Object();
    ret.year = str_yyyy;
    ret.month = str_mm;
    ret.day = str_dd;
    ret.hour = h;
    ret.minute = m;

    return ret;
};

module.exports = getTodayObj;