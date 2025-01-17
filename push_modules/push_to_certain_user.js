/**
 * Created by Myown on 2017-08-17.
 */

var fcm = require('./set_fcm_server');
var express = require('express');
var router = express.Router();
var member = require('../models/Member');
var push = require('./push_notification');

var message = {
    to : null,
    data : null,
    notification : null
}

router.post('/', function (req, res) {
    var recv_data = req.body;

    var id_email = recv_data.id_email;
    //var push_title = recv_data.title;
    //var push_body = recv_data.body;

    /*
    message.data = {title : push_title, body : push_body};
    message.notification = {title : push_title, body : push_body};

    member.find({doc_type : 'member_data', id_email : id_email}, function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5800";
            send_obj.response = {message : "database error"};
            res.send(send_obj);
            res.end();
        }else{
            if(result.length == 0){
                var send_obj = new Object();
                send_obj.code = "4800";
                send_obj.response = {message : "not exist access key"};
                res.send(send_obj);
                res.end();
            }
            else{
                var tmp = result[0];
                var token = tmp.device_token;
                message.to = token;
                console.log(JSON.stringify(tmp));
                push.pushChatNotification(id_email);

                fcm.send(message, function (err, response) {
                    if(err){
                        console.error(JSON.stringify(err));
                        var send_obj = new Object();
                        send_obj.code = "5300";
                        send_obj.response = { message : "sent failed" };
                        res.send(send_obj);
                        res.end();
                    }else {
                        var send_obj = new Object();
                        send_obj.code = "3300";
                        send_obj.response = { message : "push message sent successfully"};
                        res.send(send_obj);
                        res.end();
                    }
                });

            }
        }
    });
    */
    push.pushChatNotification(id_email);
    res.end();
});

module.exports = router;