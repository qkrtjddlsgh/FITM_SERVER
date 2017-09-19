var express = require('express');
var router = express.Router();
var boxNotification = require('../../models/boxNotification');

router.post('/', function (req, res) {

    var recv_data = req.body;
    var notification_idx = recv_data.notification_idx;

    boxNotification.remove({notification_idx : notification_idx}, function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5800";
            send_obj.response = {message : "database error"};
            res.send(send_obj);
            res.end();
        }else{
            var send_obj = new Object();
            if(result.n < 1){
                send_obj.code = "2503";
                send_obj.response = { message : "no document"};
                res.send(send_obj);
                res.end();
            }else {
                send_obj.code = "2500";
                send_obj.response = result;
                res.send(send_obj);
                res.end();
            }
        }
    });

});

module.exports = router;