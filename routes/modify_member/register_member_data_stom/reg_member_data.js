/**
 * Created by Myown on 2017-07-18.
 */
var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var name = recv_data.name;
    var phone_number = recv_data.phone_number;
    var gender = recv_data.gender;
    var birthday = recv_data.birthday;
    var set_data = {$set : {name : name, phone_number : phone_number, gender : gender, birthday : birthday}};
    
    members.update({access_key : access_key, doc_type : "member_data"}, set_data, function (err, result) {
        if(err){
            console.log(err.message);
        }
        if(result.n == 0){
            console.log("no docs");
            var send_data = new Object();
            send_data.code = "5100";
            send_data.response = {error:"not exist access key"};
            res.send(send_data);
            res.end();
        }
        else{
            console.log(result);
            members.findOne({access_key:access_key}, function (err, result) {

                var send_data = new Object();
                var add_data = new Object();
                add_data.access_key = result.access_key;
                add_data.name = result.name;
                add_data.phone_number = result.phone_number;
                add_data.gender = result.gender;
                add_data.birthday = result.birthday;
                send_data.response = add_data;
                send_data.code = "1110";
                res.send(send_data);
                res.end();
            });
        }
    })
});

module.exports = router;