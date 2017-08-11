var express = require('express');
var router =  express.Router();
var movement = require('../../../models/Movement');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var movement_data = recv_data.movement_name;

    movement.find({movement_name: movement_data}, function (err, doc) {
        if(err){
            console.error(err.message);
        }
        else{
            if(doc.length == 0){
                // 겹치는 movement_data가 없을 때
                var make_movement = new movement();
                make_movement.movement_name = movement_data;

                make_movement.save(function (err, room) {
                    // 새로운 movement_data의 정보에 대한 document를 저장
                    if(err){
                        console.error(err.message);
                    }
                    else{
                        return room;
                    }
                });

                var add_data = new Object();

                add_data.movement_name = movement_data;

                var res_data = new Object();

                res_data.code = "9999";
                res_data.response = add_data;

                res.send(res_data);
                res.end();
            }
            else{
                // 이미 존재하는 movement_data 입력 시
                var send_data = new Object();
                send_data.code = "8888";
                send_data.response = {error_message : "Movement_data is already exist"};

                res.send(send_data);
                res.end();
            }
        }
    })
});

module.exports = router;