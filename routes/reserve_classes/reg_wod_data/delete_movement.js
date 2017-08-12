var express = require('express');
var router =  express.Router();
var movement = require('../../../models/Movement');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var movement_data = recv_data.movement_name;

    if(!req.body.movement_name){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        movement.find({movement_name: movement_data}, function (err, doc) {
            if (err) {
                console.error(err.message);
            }
            if (doc.length == 0) {
                // 겹치는 movement_data가 없을 때
                var add_data = new Object();

                add_data.message = "Movement_data is not exist!!";

                var res_data = new Object();

                res_data.code = "8888";
                res_data.response = add_data;

                res.send(res_data);
                res.end();
            }
            else {
                movement.remove({movement_name: movement_data}, function (err, result) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        // 정상적으로 삭제 시
                        var send_data = new Object();
                        send_data.code = "9999";
                        send_data.response = {error_message: "Movement_data is removed"};

                        res.send(send_data);
                        res.end();
                    }
                })
            }
        });
    }
});

module.exports = router;