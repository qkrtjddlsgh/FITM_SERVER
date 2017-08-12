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
                    send_data.response = result[0];

                    res.send(send_data);
                    res.end();
                }
            }
        });
    }
});

module.exports = router;