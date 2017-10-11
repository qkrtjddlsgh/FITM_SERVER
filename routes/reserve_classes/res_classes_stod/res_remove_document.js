var express = require('express');
var router =  express.Router();
var time_table = require('../../../models/Time_Table');
var today = require('../../../util_modules/date_manip/getToday');

router.post('/', function(req, res){
    var recv_data = req.body;

    var date = recv_data.date;

    if(!req.body.date){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        if (date < today(new Date())) {
            // 현재 날짜 이전의 수업 삭제 시
            var send_data = new Object();
            send_data.code = "5700";

            var add_data = new Object();
            add_data.date = date;
            add_data.message = "Can't remove this date!!";
            send_data.response = add_data;

            res.send(send_data);
            res.end();
        }
        else {
            time_table.remove({date: date}, function (err, result) {
                if (err) {
                    console.error(err.message);
                }
                else {
                    var send_data = new Object();

                    // date에 해당 되는 수업을 삭제했을때
                    send_data.code = "5500";

                    var add_data = new Object();

                    add_data.date = date;
                    add_data.message = "classes removed";
                    send_data.response = add_data;

                    res.send(send_data);
                    res.end();
                }
            })
        }
    }
});

module.exports = router;