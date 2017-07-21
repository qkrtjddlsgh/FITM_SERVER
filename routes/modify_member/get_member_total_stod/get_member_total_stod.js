/**
 * Created by Myown on 2017-07-21.
 */

var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');


router.post('/', function (req, res) {
    var recv_data = req.body;
    if(recv_data.password == "master"){
        members.find({doc_type:"member_data"}, function (err, result) {
            if(err){
                var send_data = new Object();
                send_data.code = "5310";
                send_data.response = { error_msg : "internal error - DB error"};
                res.send(send_data);
                res.end();
            }
            else{
                var send_data = new Object();
                send_data.code = "2130";
                send_data.response = result;
                res.send(send_data);
                res.end();
            }
        })
    }
    else{
        var send_data = new Object();
        send_data.code = "5300";
        send_data.response = { error_msg : "invalid password"};
        res.send(send_data);
        res.end();
    }
});

module.exports = router;