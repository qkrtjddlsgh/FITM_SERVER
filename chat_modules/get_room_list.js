var express = require('express');
var router = express.Router();
var message_log = require('../models/message_log');

router.post('/', function (req, res) {
    var recv_data = req.body;

    message_log.find(function (err, result) {
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
                send_obj.response = {message : 'no documents'};
                res.send(send_obj);
                res.end();
            }else{
                var tmp_arr = new Array();
                for(var i = 0; i < result.length ; i++){
                    tmp_arr.push(result[i].room_name);
                }
                var send_obj = new Object();
                send_obj.room_list = tmp_arr;
                res.send(send_obj);
                res.end();
            }
        }
    })

});

module.exports = router;