// state가 1인 회원
// state_date에 certification 1과 remain_break_day - diff
// end_date + 1에 certification 2과 state 3

//check_certification

var express = require('express');
var router = express.Router();
var remains = require('../../../models/Remain_List');
var today = require('../../../util_modules/date_manip/getToday');
var members = require('../../../models/Member');

router.post('/', function(req, res){

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
            var res_data = new Object();
            res_data.code = "8888";

            res.send(res_data);
            res.end();
        }
        else{
            for(var i=0; i<doc.length; i++){
                // state 3으로 넘어가기전에 수정해줘야함.
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

                console.log(ddd);
                console.log(sddd);
                console.log(eddd);

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

                            var new_finish_date = new Date(bddd + doc[0].diff);

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
                    // 휴회 끝날때, finish_date 추가해야됨.

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

                            var query2 = {$set: {state: 3}};

                            remains.update({id_email: doc[0].id_email}, query2, function(err, result){
                                if(err){
                                    console.error(err.message);
                                }
                            })
                        }
                    })
                }

            }
        }
        var res_data = new Object();
        res_data.code = "9999";

        res.send(res_data);
        res.end();
    });
});

module.exports = router;