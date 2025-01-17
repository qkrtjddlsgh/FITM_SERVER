/**
 * Created by Myown on 2017-08-18.
 */

var express = require('express');
var router = express.Router();
var message_log = require('../models/message_log');
var getTime = require('../util_modules/date_manip/getTodayObj');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var room_name = recv_data.room_name;
    var message = recv_data.message;
    var sender = recv_data.sender;

    var doc = {access_key : access_key, room_name : room_name};

    message_log.find(doc, function (err, result) {
       if(err){
           console.error("TEST : " + JSON.stringify(err));
           res.end();
       } else{
           if(result.length != 0){
               //result[0].message_list.push({message_idx : idx+1, message : message, sender : sender});
               var new_message =  {message : message, sender : sender, idx_time : new Date().getTime()};
               var query = {$push : {message_list : new_message}};
               message_log.update(doc, query, function (err, result) {
                    if(err){
                        console.error(JSON.stringify(err));
                        res.end();
                    }
                    else{
                        console.log("push success");
                        res.end();
                    }
               });
           }
       }
    });

});

module.exports = router;