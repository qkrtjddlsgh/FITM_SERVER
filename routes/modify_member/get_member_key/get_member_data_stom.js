var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id_email = recv_data.id_email;

    if(!req.body.id_email){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        members.find({id_email: id_email, doc_type: "member_data"}, function (err, result) {
            if (err) {
                console.error(err.message);
            }
            else {
                if (result.length == 0) {
                    var send_data = new Object();
                    send_data.code = "1300";

                    var add_data = new Object();
                    add_data.message = "Not exist id_eamil!!";
                    send_data.response = add_data;

                    res.send(send_data);
                    res.end();
                }
                else {
                    var send_data = new Object();

                    send_data.code = "2300";
                    //send_data.response = result[0];

                    var add_data = new Object();
                    add_data.check_register = result[0].check_register;
                    add_data.locker_finish = result[0].locker_finish.substr(0,4) + "/" + result[0].locker_finish.substr(4,2) + "/" + result[0].locker_finish.substr(6,2);
                    add_data.locker_start = result[0].locker_start.substr(0,4) + "/" + result[0].locker_start.substr(4,2) + "/" + result[0].locker_start.substr(6,2);
                    add_data.locker_num = result[0].locker_num;
                    add_data.gender = result[0].gender;
                    add_data.birthday = result[0].birthday;
                    add_data.doc_type = result[0].doc_type;
                    add_data.certification = result[0].certification;
                    add_data.remain_break_day = result[0].remain_break_day;
                    add_data.finish_date = result[0].finish_date.substr(0,4) + "/" + result[0].finish_date.substr(4,2) + "/" + result[0].finish_date.substr(6,2);;
                    add_data.start_date = result[0].start_date.substr(0,4) + "/" + result[0].start_date.substr(4,2) + "/" + result[0].start_date.substr(6,2);
                    add_data.phone_number = result[0].phone_number;
                    add_data.name = result[0].name;
                    add_data.id_email = result[0].id_email;
                    add_data.access_key = result[0].access_key;

                    send_data.response = add_data;

                    res.send(send_data);
                    res.end();
                }
            }
        });
    }
});

module.exports = router;