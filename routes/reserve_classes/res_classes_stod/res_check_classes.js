// 해당 date에 등록된 회원의 access_key 목록을 불러옴

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
        else{
            //send_data.response = result;
            var add_data = new Object();
            var send_data = new Array();

            for(var i=0; i<result[0].classes.length; i++){
                add_data.class_num = i+1;
                for(var j=0; j<result[0].classes[i].participant.length; j++){
                    add_data.access_key = result[0].classes[i].participant[j];
                }
                send_data.response = add_data;
            }

            res.send(send_data);
            res.end();
        }
    })
});

module.exports = router;