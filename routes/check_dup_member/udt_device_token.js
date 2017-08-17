/**
 * Created by Myown on 2017-08-17.
 */

var express = require('express');
var router = express.Router();
var member = require('../../models/Member');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var device_token = recv_data.device_token;

    var doc = {access_key : access_key};
    var query = { $set : {device_token : device_token}};

    member.update(doc, query, function (err, result) {
       if(err){
           console.error(JSON.stringify(err));
           var send_obj = new Object();
           send_obj.code = "5800";
           send_obj.response = {message : "database error"};
           res.send(send_obj);
           res.end();
       }
       else{
           console.log(JSON.stringify(result));
           var send_obj = new Object();
           send_obj.code = "3011";
           send_obj.response = {message : "device token is updated"};
           res.send(send_obj);
           res.end();
       }
    });
});

module.exports = router;