// state가 1인 회원
// state_date에 certification 1과 remain_break_day - diff
// end_date + 1에 certification 2과 state 3

var cron = require('node-cron');
var express = require('express');
var router = express.Router();

var today = require('../../util_modules/date_manip/getToday');
var remains = require('../../models/Remain_List');
var member = require('../../models/Member');

// 매일 AM 12:00 마다 실행 됨
cron.schedule('0 1 * * *', function () {
    console.log('info', 'running a task every day / ' + new Date());

    //console.log(today(new Date());

    member.find({certification: 2}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<doc.length; i++) {
                if(doc[i].finish_date < today(new Date())){
                    // 회원기간만료이므로 certification 1로 수정
                    var query = {$set: {certification : 1}};

                    member.update({certification : 2}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                    });

                }
            }
        }
    });

    var TODAY = today(new Date());
    var year = Number(TODAY.substr(0,4));
    var month = Number(TODAY.substr(4,2))-1;
    var day = Number(TODAY.substr(6,2))+1;

    // yyyymmdd
    var ddd = new Date(year, month, day);

    remains.find({state: 1}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){

        }
        else{
            for(var i=0; i<doc.length; i++){

                var sd = doc[i].start_date;
                var syear = Number(sd.substr(0,4));
                var smonth = Number(sd.substr(4,2))-1;
                var sday = Number(sd.substr(6,2))+1;

                // yyyymmdd
                var sddd = new Date(syear, smonth, sday);

                var ed = doc[i].end_date;
                var eyear = Number(ed.substr(0,4));
                var emonth = Number(ed.substr(4,2))-1;
                var eday = Number(ed.substr(6,2))+1;

                // yyyymmdd
                var eddd = new Date(eyear, emonth, eday);

                if(sddd - ddd == 0){

                    members.find({id_email: doc[0].id_email}, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                        else{
                            var new_remain_break_day = (result[0].remain_break_day*86400000 - doc[0].diff) / 86400000;

                            var query = {$set: {certification: 1, remain_break_day: new_remain_break_day}};

                            members.update({id_email: doc[0].id_email}, query, function(err, result){
                                if(err){
                                    console.error(err.message);
                                }
                            });
                        }
                    });
                }
                else if(eddd + 86400000 == ddd){

                    members.find({id_email: doc[0].id_email}, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                        else{
                            // finish_date 늘리기
                            var query = {$set: {certification: 2}};

                            members.update({id_email: doc[0].id_email}, query, function(err, result){
                                if(err){
                                    console.error(err.message);
                                }
                            });

                        }
                    })
                }

            }
        }
    });

    var query3 = {set: {state: 4}};

    remains.update({state: 2}, query3, function(err, doc){
        if(err){
            console.error(err.message);
        }
    })

    var query4 = {set: {state: 3}};

    remains.update({state: 1}, query4, function(err, doc){
        if(err){
            console.error(err.message);
        }
    })

}).start();

module.exports = router;