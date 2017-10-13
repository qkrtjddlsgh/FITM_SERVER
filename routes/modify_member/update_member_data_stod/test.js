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