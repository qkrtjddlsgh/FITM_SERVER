var express = require('express');
var router = express.Router();
var boxNotification = require('../../models/boxNotification');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var title = recv_data.title;
    var body = recv_data.body;

    var newDocs = new boxNotification();
    newDocs.title = title;
    newDocs.body = body;
    newDocs.notification_idx = new Date().getTime();

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
        }
    });

});

module.exports = router;