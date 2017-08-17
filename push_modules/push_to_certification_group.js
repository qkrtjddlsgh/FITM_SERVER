/**
 * Created by Myown on 2017-08-17.
 */

var fcm = require('./set_fcm_server');
var express = require('express');
var router = express.Router();
var member = require('../models/Member');

router.post('/', function (req, res) {
    var recv_data = req.body;
    var certification = recv_data.certification;

    var push_obj = {
        title : recv_data.title,
        body : recv_data.body
    }

    member.find({doc_type : "member_data", certification : {$gte : certification}}, function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5300";
            send_obj.response = { message : "database error" };
            res.send(send_obj);
            res.end();
        }
        else{
            if(result.length == 0){
                var send_obj = new Object();
                send_obj.code = "9999";
                send_obj.response = { message : "param error" };
                res.send(send_obj);
                res.end();
            }
            else {
                var success_cnt = 0;
                var fail_cnt = 0;
                for (var i = 0; i < result.length; i++) {
                    var message = {
                        to : result[i].device_token,
                        data : push_obj,
                        notification : push_obj
                    }
                    fcm.send(message, function (err, response) {
                       if(err){
                           fail_cnt += 1;
                           console.error(JSON.stringify(err));
                       }
                       else{
                           success_cnt += 1;
                           console.log("push success");
                       }
                    });
                }
                var send_obj = new Object();
                console.log("success : " + success_cnt + " , fail : " + fail_cnt );
                send_obj.code = "2222";
                send_obj.response = { push_count : result.length };
                res.send(send_obj);
                res.end();
            }
        }
    });

});

module.exports = router;