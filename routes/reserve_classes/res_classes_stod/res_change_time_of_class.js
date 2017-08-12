// 수업 정보 등록 및 수정을 위한 모듈

var express = require('express');
var router =  express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var chk_date = recv_data.date;
    var chk_class_num = recv_data.class_num;
    var udt_start_time = recv_data.start_time;
    var udt_finish_time = recv_data.finish_time;

    if(!req.body.date || !req.body.class_num || !req.body.start_time || !req.body.finish_time){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        var set_data = {$set: {'classes.$.start_time': udt_start_time, 'classes.$.finish_time': udt_finish_time}};

        time_table.update({
            date: chk_date,
            classes: {$elemMatch: {class_num: chk_class_num}}
        }, set_data, function (err, result) {
            if (err) {
                console.error(err.message);
                var send_data = new Object();
                send_data.code = "5600";
                send_data.response = {error_message: "database error occur"};
                res.send(send_data);
                res.end();
            }
            else {
                if (result.ok) {
                    time_table.find({date: chk_date}, {classes: {$elemMatch: {class_num: chk_class_num}}}, function (err, result) {
                        if (err) {
                            console.error(err.message);
                            var send_data = new Object();
                            send_data.code = "5600";
                            send_data.response = {error_message: "database error occur"};
                            res.send(send_data);
                            res.end();
                        }
                        else {
                            var send_data = new Object();
                            send_data.code = "3010";
                            send_data.response = result[0];
                            res.send(send_data);
                            res.end();
                        }
                    });
                }
                else {
                    var send_data = new Object();
                    send_data.code = "4600";
                    send_data.response = {error_message: "error occur while document update"};
                    res.end();
                }
            }
        });
    }
});

module.exports = router;