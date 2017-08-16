var express = require('express');
var router =  express.Router();
var wod_list = require('../../../models/Wod_List');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var wod_name = recv_data.wod_name;

    if(!req.body.wod_name){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        wod_list.find({wod_name: wod_name}, function(err, doc){
            if (err) {
                console.error(err.message);
            }
            if(doc.length == 0){
                var send_data = new Object();
                send_data.code = "8888";

                var add_data = new Object();
                add_data.message = "WOD is not exist!!";

                send_data.response = add_data;

                res.send(send_data);
                res.end();
            }
            else {
                var send_data = new Object();
                send_data.code = "9999";

                var add_data = new Object();
                add_data.result = doc;

                send_data.response = add_data;

                res.send(send_data);
                res.end();
            }
        });
    }
});

module.exports = router;