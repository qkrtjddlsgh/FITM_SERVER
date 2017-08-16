var express = require('express');
var router = express.Router();
var wod_list = require('../../../models/Wod_List');

router.post('/', function(req, res){
    var recv_data = req.body;

    var wod_name = recv_data.wod_name;
    var wod_content = recv_data.wod_content;
    var num_of_movements = recv_data.num_of_movements;
    var movement_list = recv_data.movement_list;
    var doc_type = recv_data.doc_type;

    if(!req.body.wod_name || !req.body.wod_content || !req.body.num_of_movements || !req.body.movement_list || !req.body.doc_type){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        // wod_name, num_of_movements
        wod_list.find({wod_name: wod_name}, function (err, doc) {
            if (err) {
                console.error(err.message);
            }
            else {
                if (doc.length == 0) {
                    // 겹치는 wod_name이 없을 때
                    var make_wod = new wod_list();
                    make_wod.wod_name = wod_name;
                    make_wod.wod_content = wod_content;
                    make_wod.num_of_movements = num_of_movements;
                    make_wod.doc_type = doc_type;

                    for (var i = 0; i < num_of_movements; i++) {
                        make_wod.movement_list[i] = movement_list[i];
                    }

                    make_wod.save(function (err, room) {
                        // 새로운 wod_name의 정보에 대한 document를 저장
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            return room;
                        }
                    });

                    var add_data = new Object();

                    add_data.wod_name = wod_name;
                    add_data.message = "Wod Registered";

                    var res_data = new Object();

                    res_data.code = "9999";
                    res_data.response = add_data;

                    res.send(res_data);
                    res.end();
                }
                else {
                    // 이미 존재하는 wod_name 입력 시
                    var send_data = new Object();
                    send_data.code = "8888";
                    send_data.response = {error_message: "Wod_name is already exist"};

                    res.send(send_data);
                    res.end();
                }
            }
        });
    }
});

module.exports = router;