var express = require('express');
var router =  express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var date = recv_data.date;
    var today_wod = recv_data.today_wod;
    var num_of_classes = recv_data.num_of_classes;
    var max_participant = recv_data.max_participant;

    time_table.find({date: date}, function (err, result) {
        if(err){
            console.error(err.message);
        }
        else{
            if(result.length == 0){
                // 겹치는 날짜가 없기 때문에 시간표를 만들 수 있다.
                var make_time_table = new time_table();
                make_time_table.date = date;
                make_time_table.today_wod = today_wod;
                make_time_table.num_of_classes = num_of_classes;

                for(var i = 0; i < num_of_classes; i++){
                    var tmp = new Object();
                    tmp.class_num = i + 1;
                    tmp.start_time = null;
                    tmp.finish_time = null;
                    tmp.max_participant = max_participant;
                    tmp.participant = [];

                    make_time_table.classes[i] = tmp;
                }

                make_time_table.save(function (err, result) {
                    if(err){
                        console.error(err.message);
                    }
                    else{
                        var send_data = new Object();
                        send_data.code = "3000";

                        var add_data = new Object();
                        add_data.result = result;

                        send_data.response = add_data;

                        res.send(send_data);
                        res.end();
                    }
                });

            }
            else{
                // 이미 겹치는 날짜가 있으므로 날짜를 다시 선택해야한다.
                console.log("date is already exist");
                var send_data = new Object();
                send_data.code = "5400";
                send_data.response = {error_message : "date is already exist"};

                res.send(send_data);
                res.end();
            }
        }
    })

});

module.exports = router;