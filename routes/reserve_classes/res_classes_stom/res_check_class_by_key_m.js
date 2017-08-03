var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res){
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var date = recv_data.date;
    
    // enroll 여부를 알려줌, 0이면 not enroll, 1이면 enroll
    var chk_data = new Object();
    chk_data.found = 0;

    time_table.find({date : date}, function(err, result){
        if(err){
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
                for (var i = 0; i < result[0].classes.length; i++) {
                    for (var j = 0; j < result[0].classes[i].participant.length; j++) {
                        if (result[0].classes[i].participant[j].access_key == access_key) {
                            // access_key가 들어있는 수업을 찾았을때
                            chk_data.found = 1;
                            
                            var add_data = new Object();

                            add_data.date = result[0].date;
                            add_data.today_wod = result[0].today_wod;
                            add_data.name = result[0].classes[i].participant[j].name;
                            add_data.class_num = result[0].classes[i].class_num;
                            add_data.start_time = result[0].classes[i].start_time;
                            add_data.finish_time = result[0].classes[i].finish_time;

                            var send_data = new Object();

                            send_data.code = "1170";
                            send_data.response = add_data;
                            res.send(send_data);
                            res.end();
                        }
                    }
                }

                if(chk_data.found == 0){
                    var send_data = new Object();
                    send_data.code = "2170";

                    var add_data = new Object();
                    add_data.message = "not enrolled!!";
                    send_data.response = add_data;

                    res.send(send_data);
                    res.end();
                }
            }
        }
    })
});

module.exports = router;