var express = require('express');
var router = express.Router();
var boxNotification = require('../../models/boxNotification');

router.post('/', function (req, res) {

    var recv_data = req.body;
    var notification_idx = recv_data.notification_idx;
    var update_title = recv_data.title;
    var update_body = recv_data.body;

    var find_query = { notification_idx : notification_idx };
    var update_query = { $set : { title : update_title, body : update_body }};

    boxNotification.update(find_query, update_query, function (err, result) {
       if(err){
           console.error(JSON.stringify(err));
           var send_obj = new Object();
           send_obj.code = "5800";
           send_obj.response = {message : "database error"};
           res.send(send_obj);
           res.end();
       }else {
           var send_obj = new Object();
           send_obj.code = "2600";
           send_obj.response = result;
           res.send(send_obj);
           res.end();
       }
    });

});

module.exports = router;