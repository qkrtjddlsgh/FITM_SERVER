var express = require('express');
var router = express.Router();
var boxNotification = require('../../models/boxNotification');
var push = require('../../push_modules/push_notification');

router.post('/', function (req, res) {

    //push.pushBoxNotification('a','a'); // 공지사항과 관련되어 push notification 을 보내는 함수

    var recv_data = req.body;

    var title = recv_data.title;
    var body = recv_data.body;

    var newDocs = new boxNotification();
    newDocs.title = title;
    newDocs.body = body;
    newDocs.notification_idx = new Date().getTime();

    if(title == null || body == null){
        var send_obj = new Object();
        send_obj.code = '4999';
        send_obj.response = { message : 'title or body is null' };
        res.send(send_obj);
        res.end();
        return;
    }

    newDocs.save(function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5800";
            send_obj.response = {message : "database error"};
            res.send(send_obj);
            res.end();
        }else{
            var send_obj = new Object();
            send_obj.code = "3999";
            send_obj.response = { message : result };
            res.send(send_obj);
            res.end();
            push.pushBoxNotification(title, body);
        }
    });

});

module.exports = router;