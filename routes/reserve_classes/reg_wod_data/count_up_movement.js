var express = require('express');
var router =  express.Router();
var movement = require('../../../models/Movement');

router.post('/', function(req, res){
    var recv_data = req.body;

    var movement_name = recv_data.movement_name;

    if(!req.body.movement_name){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else{
        movement.find({movement_name: movement_name}, function(err, doc){
            if (err) {
                console.error(err.message);
            }
            else {
                if (doc.length == 0) {
                    // 겹치는 movement_data가 없을 때
                    var add_data = new Object();

                    add_data.movement_name = movement_name;
                    add_data.message = "Movement_data is not exist";

                    var res_data = new Object();

                    res_data.code = "9999";
                    res_data.response = add_data;

                    res.send(res_data);
                    res.end();
                }
                else {
                    // movement_data를 찾았을 때
                    var new_count = doc[0].movement_count + 1;
                    var query = {$set: {movement_count: new_count}};

                    movement.update({movement_name: movement_name}, query, function(err, result){
                        if (err) {
                            console.error(err.message);
                        }
                        else{
                            var add_data = new Object();
                            add_data.movement_name = movement_name;
                            add_data.movement_count = new_count;

                            var send_data = new Object();
                            send_data.code = "8888";
                            send_data.response = add_data;

                            res.send(send_data);
                            res.end();
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;