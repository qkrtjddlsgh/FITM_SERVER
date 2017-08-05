/**
 * Created by Myown on 2017-07-17.
 */

var getTodayObj = function(){
    var today = new Date();
    today.setHours(today.getHours() + 9);
    var yyyy = today.getUTCFullYear();
    var mm = today.getUTCMonth() + 1;
    var dd = today.getUTCDate();

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
    ret.date = str_dd;

    return ret;
};

module.exports = getTodayObj;