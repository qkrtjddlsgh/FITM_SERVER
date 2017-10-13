var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');
var remains = require('../../../models/Remain_List');

router.post('/', function(req, res){
    var recv_data = req.body;

    var start_date = recv_data.start_date;
    var end_date = recv_data.end_date;
    var name = recv_data.name;
    var id_email = recv_data.id_email;
    var comments = recv_data.comments;

    var s_year = Number(start_date.substr(0,4));
    var s_month = Number(start_date.substr(4,2))-1;
    var s_day = Number(start_date.substr(6,2))-1;

    var e_year = Number(end_date.substr(0,4));
    var e_month = Number(end_date.substr(4,2))-1;
    var e_day = Number(end_date.substr(6,2))-1;

    var start = new Date(s_year, s_month, s_day);
    var end = new Date(e_year, e_month, e_day);

    var diff = end - start;

    members.find({id_email: id_email}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "7777";
            res_data.message = "id_email이 존재하지 않습니다.";

            res.send(res_data);
            res.end();
        }
        else{
            if(diff > doc[0].remain_break_day*86400000){
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "잔여일수가 부족합니다.";

                res.send(res_data);
                res.end();
            }
            else{
                remains.find({id_email: id_email}, function(err, result){
                    if(err){
                        console.error(err.message);
                    }
                    if(result.length == 0){
                        var new_remains = new remains();
                        new_remains.start_date = start_date;
                        new_remains.end_date = end_date;
                        new_remains.name = name;
                        new_remains.id_email = id_email;
                        new_remains.comments = comments;

                        new_remains.state = 0;
                        new_remains.diff = diff;
                        new_remains.message = "신청중입니다.";
                        new_remains.save();

                        var res_data = new Object();
                        res_data.code = "9999";
                        res_data.message = "정상적으로 신청되었습니다.";

                        res.send(res_data);
                        res.end();
                    }
                    else if(result[0].id_email == id_email && result[0].state == 3){
                        var check = 1;

                        for(var i=0; i<result.length; i++){
                            if(result[i].id_email == id_email && result[i].state != 3){
                                check = 0;
                            }
                        }

                        if(check == 1) {
                            var new_remains = new remains();
                            new_remains.start_date = start_date;
                            new_remains.end_date = end_date;
                            new_remains.name = name;
                            new_remains.id_email = id_email;
                            new_remains.comments = comments;

                            new_remains.state = 0;
                            new_remains.diff = diff;
                            new_remains.message = "신청중입니다.";
                            new_remains.save();

                            var res_data = new Object();
                            res_data.code = "9999";
                            res_data.message = "정상적으로 신청되었습니다.";

                            res.send(res_data);
                            res.end();
                        }
                        else{
                            var res_data = new Object();
                            res_data.code = "6666";
                            res_data.message = "이미 신청되었습니다.";

                            res.send(res_data);
                            res.end();
                        }
                    }
                    else if(result[0].id_email == id_email && result[0].state == 0){
                        var res_data = new Object();
                        res_data.code = "6666";
                        res_data.message = "이미 신청되었습니다.";

                        res.send(res_data);
                        res.end();
                    }
                    else if(result[0].id_email == id_email && result[0].state == 1){
                        var res_data = new Object();
                        res_data.code = "5555";
                        res_data.message = "이미 승인되었습니다.";

                        res.send(res_data);
                        res.end();
                    }
                    else if(result[0].id_email == id_email && result[0].state == 2){
                        var res_data = new Object();
                        res_data.code = "4444";
                        res_data.message = "이미 거절되었습니다.";

                        res.send(res_data);
                        res.end();
                    }
                });
            }
        }
    });
});

module.exports = router;