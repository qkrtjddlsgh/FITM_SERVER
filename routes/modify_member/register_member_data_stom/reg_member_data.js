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

    if(!req.body.access_key || !req.body.name || !req.body.phone_number || !req.body.gender || !req.body.birthday){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        var set_data = {$set: {name: name, phone_number: phone_number, gender: gender, birthday: birthday, check_register: 1}};

        members.update({access_key: access_key, doc_type: "member_data"}, set_data, function (err, result) {
            if (err) {
                console.log(err.message);
            }
            if (result.n == 0) {
                console.log("no docs");
                var send_data = new Object();
                send_data.code = "5100";
                send_data.response = {error: "not exist access key"};
                res.send(send_data);
                res.end();
            }
            else {
                members.find({access_key: access_key, doc_type: "member_data"}, function (err, result) {
                    if(result[0].check_register == 0){
                        var add_data = new Object();
                        add_data.message = "Not completely registered";

                        var send_data = new Object();
                        send_data.code = "1120";
                        send_data.response = add_data;

                        res.send(send_data);
                        res.end();
                    }
                    else {
                        var send_data = new Object();
                        var add_data = new Object();
                        add_data.access_key = result[0].access_key;
                        add_data.name = result[0].name;
                        add_data.phone_number = result[0].phone_number;
                        add_data.gender = result[0].gender;
                        add_data.birthday = result[0].birthday;
                        send_data.response = add_data;
                        send_data.code = "1110";
                        res.send(send_data);
                        res.end();
                    }
                });
            }
        })
    }
});

module.exports = router;