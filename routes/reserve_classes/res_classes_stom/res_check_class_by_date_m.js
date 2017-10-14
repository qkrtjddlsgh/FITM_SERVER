var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var date = recv_data.date;

    if(!req.body.date){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        time_table.find({date: date}, function (err, result) {
            if (err) {
                console.error(err.message);
            }
            else {
                if (result.length == 0) {
                    // date에 해당되는 수업이 없을때
                    var send_data = new Object();
                    send_data.code = "2170";

                    var add_data = new Object();
                    add_data.message = "not classes in this date!!";
                    send_data.response = add_data;

                    res.send(send_data);
                    res.end();
                }
                else {

                    /*for (var i = 0; i < result[0].classes.length; i++) {
                        for (var j = 0; j < result[0].classes[i].participant.length; j++) {
                            result[0].classes[i].participant[j].access_key = null;
                        }
                    }*/

                    var send_data = new Object();

                    send_data.code = "1150";
                    send_data.response = result[0];

                    res.send(send_data);
                    res.end();
                }
            }
        })
    }
});

module.exports = router;