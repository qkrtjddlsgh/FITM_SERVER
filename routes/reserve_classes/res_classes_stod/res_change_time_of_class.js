// 수업 정보 등록을 위한 모듈
// 작업중..

var express = require('express');
var router =  express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var chk_date = recv_data.date;
    var chk_class_num = recv_data.class_num;
    var udt_start_time = recv_data.start_time;
    var udt_finish_time = recv_data.finish_time;

    var set_data = {$set: {'classes.$.start_time': udt_start_time, 'classes.$.finish_time': udt_finish_time}};

    time_table.update({date:chk_date ,classes : {$elemMatch:{class_num : chk_class_num}}} ,set_data, function (err, result) {
        if(err){
            console.error(err.message);
            var send_data = new Object();
            send_data.code = "5600";
            send_data.response = {error_message: "database error occur"};
            res.send(send_data);
            res.end();
        }
        else{
            if(result.ok){
                time_table.find({date:chk_date}, {classes : {$elemMatch:{class_num:chk_class_num}}} , function (err, result) {
                   if(err){
                       console.error(err.message);
                       var send_data = new Object();
                       send_data.code = "5600";
                       send_data.response = {error_message: "database error occur"};
                       res.send(send_data);
                       res.end();
                   }
                   else{
                       var send_data = new Object();
                       send_data.code = "3010";
                       send_data.response = result[0];
                       res.send(send_data);
                       res.end();
                   }
                });
            }
            else{
                var send_data = new Object();
                send_data.code = "4600";
                send_data.response = {error_message: "error occur while document update"};
                res.end();
            }
        }
    });
    /*
    time_table.update({date: chk_date}, set_data, function(err, result){
        console.log(result);
        if(err){
            console.error(err.message);
        }
        else{
            var add_data = new Object();

            add_data.date = recv_data.date;
            add_data.class_num = recv_data.class_num;
            add_data.start_time = recv_data.start_time;
            add_data.finish_time = recv_data.finish_time;

            var res_data = new Object();
            // 성공적으로 수업 등록 시
            res_data.code = "9999";
            res_data.response = add_data;

            res.send(res_data);
            res.end();
        }
    })
    */
});

module.exports = router;