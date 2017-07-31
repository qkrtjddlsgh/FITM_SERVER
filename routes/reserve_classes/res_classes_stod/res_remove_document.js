var express = require('express');
var router =  express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var date = recv_data.date;

    time_table.remove({date: date}, function(err, result) {
        if (err) {
            console.error(err.message);
        }
        else {
            var send_data = new Object();

            // date에 해당 되는 수업을 삭제했을때
            send_data.code = "5500";

            var add_data = new Object();

            add_data.date = date;
            add_data.message = "classes removed"
            send_data.response = add_data;

            res.send(send_data);
            res.end();
        }
    })
});

module.exports = router;