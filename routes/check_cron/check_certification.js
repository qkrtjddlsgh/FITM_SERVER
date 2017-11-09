// state가 1인 회원
// state_date에 certification 1과 remain_break_day - diff
// end_date + 1에 certification 2과 state 3

var cron = require('node-cron');
var express = require('express');
var router = express.Router();

var today = require('../../util_modules/date_manip/getToday');
var remains = require('../../models/Remain_List');
var members = require('../../models/Member');

// 매일 AM 12:00 마다 실행 됨
// 1분마다 */1 * * * *
// 2시마다 * 2 * * *
cron.schedule('* 1 * * *', function () {
    console.log('info', 'running a task every day / ' + new Date());

    //console.log(today(new Date());

    members.find({certification: 2}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<doc.length; i++) {
                if(doc[i].finish_date < today(new Date())){
                    // 회원기간만료이므로 certification 1로 수정
                    var query = {$set: {certification : 1}};

                    members.update({certification : 2}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                    });

                }
            }
        }
    });

    members.find({doc_type: "member_data"}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<doc.length; i++) {
                if(doc[i].locker_finish < today(new Date())){
                    // 회원기간만료이므로 certification 1로 수정
                    // 락커기간 락커번호 변경 필요
                    var query = {$set: {locker_num: 0}};

                    members.update({doc_type: "member_data"}, query, function(err, result){
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
                    // 휴회 시작할떄

                    members.find({id_email: doc[0].id_email, doc_type: "member_data"}, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                        else{
                            var new_remain_break_day = (result[0].remain_break_day*86400000 - doc[0].diff) / 86400000;

                            // 휴회시작시 finish_date 설정
                            var before_finish = result[0].finish_date;
                            var byear = Number(before_finish.substr(0,4));
                            var bmonth = Number(before_finish.substr(4,2))-1;
                            var bday = Number(before_finish.substr(6,2))+1;
                            var bddd = new Date(byear, bmonth, bday);

                            var new_finish_date = today(new Date(bddd + doc[0].diff));

                            console.log(result[0].remain_break_day);
                            console.log(doc[0].diff);
                            console.log(new_remain_break_day);
                            console.log(new_finish_date);

                            var query = {$set: {certification: 1, remain_break_day: new_remain_break_day, finish_date: new_finish_date}};

                            members.update({id_email: doc[0].id_email, doc_type: "member_data"}, query, function(err, result){
                                if(err){
                                    console.error(err.message);
                                }
                            });
                        }
                    });
                }
                else if(eddd + 86400000 == ddd){

                    members.find({id_email: doc[0].id_email, doc_type: "member_data"}, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                        else{
                            // finish_date 늘리기
                            var query = {$set: {certification: 2}};

                            members.update({id_email: doc[0].id_email, doc_type: "member_data"}, query, function(err, result){
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

    var query3 = {$set: {state: 4}};

    remains.update({state: 2}, query3, function(err, doc){
        if(err){
            console.error(err.message);
        }
    });

    var query4 = {$set: {state: 3}};

    remains.update({state: 1}, query4, function(err, doc){
        if(err){
            console.error(err.message);
        }
    })

}).start();

module.exports = router;