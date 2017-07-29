// 수업 명단을 불러오기 위한 모듈

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
        else {
            if (result.length == 0) {
                // date에 해당되는 수업이 없을때
                var send_data = new Object();
                send_data.code = "4170";

                var add_data = new Object();
                add_data.message = "not classes in this date!!";
                send_data.response = add_data;

                res.send(send_data);
                res.end();
            }
            else {
                var add_data = new Array();

                for (var i = 0; i < result[0].classes.length; i++) {
                    // 회원이름을 저장하기 위한 array
                    var list = new Array();

                    for (var j = 0; j < result[0].classes[i].participant.length; j++) {
                        list.push(result[0].classes[i].participant[j].name);
                    }
                    add_data.push(i+1);
                    add_data.push(list);
                }

                var send_data = new Object();
                send_data.code = "4500";

                for(var k=0; k<result[0].classes.length; k++){
                    send_data.response = add_data;
                }

                res.send(send_data);
                res.end();
            }
        }
    })
});

module.exports = router;