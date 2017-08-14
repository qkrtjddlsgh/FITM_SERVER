var express = require('express');
var router = express.Router();
var wod_list = require('../../../models/Wod_List');

router.post('/', function(req, res){
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
        // wod_name, num_of_movements
        wod_list.find({wod_name: wod_name}, function (err, doc) {
            if (err) {
                console.error(err.message);
            }
            else {
                if (doc.length == 0) {
                    // 겹치는 wod_name이 없을 때
                    var add_data = new Object();

                    add_data.wod_name = wod_name;
                    add_data.message = "Wod_name is not exist!!";

                    var res_data = new Object();

                    res_data.code = "9999";
                    res_data.response = add_data;

                    res.send(res_data);
                    res.end();
                }
                else {
                    // 정상적으로 wod_name 삭제 시
                    wod_list.remove({wod_name: wod_name}, function (err, result) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            // 정상적으로 삭제 시
                            var send_data = new Object();
                            send_data.code = "9999";
                            send_data.response = {error_message: "Wod_name is removed"};

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