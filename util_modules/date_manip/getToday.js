/**
 * Created by Myown on 2017-07-17.
 */

// 현재 시간을 YYYYMMDD 의 형태로 받아오는 모듈

var getToday = function (dateObj) {
    var date = new Date(dateObj);
    var yyyy = date.getUTCFullYear();
    var mm = date.getUTCMonth() + 1;
    var dd = date.getUTCDate();

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

    return str_yyyy + str_mm + str_dd;
};

module.exports = getToday;