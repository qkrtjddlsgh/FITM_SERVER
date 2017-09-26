var express = require('express');
var router = express.Router();
var boxNotification = require('../../models/boxNotification');

router.post('/', function (req, res) {
   var send_obj = new Object();
   send_obj.code = "6666";
   send_obj.response = "request url : /read_notification/list  or  /read_notification/item";
   res.send(send_obj);
   res.end();
});

router.post('/list', function (req, res) {

    var recv_data = req.body;

    boxNotification.find({}, function (err, result) {
       if(err){
           console.error(JSON.stringify(err));
           var send_obj = new Object();
           send_obj.code = "5800";
           send_obj.response = {message : "database error"};
           res.send(send_obj);
           res.end();
       }else{
           var send_obj = new Object();
           send_obj.code = "3888";
           var tmp_arr = new Array();
           for(var i = 0 ; i < result.length; i++){
               tmp_arr.push({title :result[i].title, time_obj : result[i].create_date_obj, notification_idx : result[i].notification_idx, body : result[i].body});
           }
           send_obj.response = tmp_arr;
           res.send(send_obj);
           res.end();
       }
    });

});

router.post('/item', function (req, res) {

    var recv_data = req.body;

    var notification_idx = recv_data.notification_idx;

    boxNotification.find({notification_idx : notification_idx}, function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5800";
            send_obj.response = {message : "database error"};
            res.send(send_obj);
            res.end();
        }else{
            var send_obj = new Object();
            if(result.length == 0){
                send_obj.code = '2701';
                send_obj.response = { message : 'not exist notification'};
                res.send(send_obj);
                res.end();
            }else{
                send_obj.code = '2700';
                send_obj.response = result[0];
                res.send(send_obj);
                res.end();
            }
        }
    });

});

module.exports = router;