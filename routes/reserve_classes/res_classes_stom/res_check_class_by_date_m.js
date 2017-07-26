var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var date = recv_data.date;

    time_table.find({date : date}, function (err, result) {
        if(err){
            console.error(err.message);
        }
        else{
            var send_data = new Object();
            send_data.code = "1150";
            send_data.response = result;

            res.send(send_data);
            res.end();
        }
    })
});

module.exports = router;