/**
 * Created by Myown on 2017-08-18.
 */

var fcm = require('./set_fcm_server');
var express = require('express');
var router = express.Router();
var member = require('../models/Member');

var message = {
    to : null,
    data : null,
    notification : null
}

router.post('/', function (req, res) {
   var recv_data = req.body;

   var device_token = recv_data.token;
   var push_title = recv_data.title;
   var push_body = recv_data.body;

   message.to = device_token;
   var push_obj = {title : push_title, body : push_body };
   message.data = push_obj;
   message.notification = push_obj;

   fcm.send(message, function (err, response) {
       console.log('RESPONSE : ' + JSON.stringify(response));
      if(err){
          console.error(JSON.stringify(err));
          var send_obj = new Object();
          send_obj.code = "5300";
          send_obj.response = {message : "push sent fail", result : response};
          res.send(send_obj);
          res.end();
      }
      else{
          var send_obj = new Object();
          send_obj.code = "3300";
          send_obj.response = { message : "push message sent successfully", result : response};
          res.send(send_obj);
          res.end();
      }
   });
});

module.exports = router;