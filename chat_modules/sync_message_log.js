/**
 * Created by Myown on 2017-08-18.
 */

var express = require('express');
var router = express.Router();
var message_log = require('../models/message_log');

function cmp(a ,b){
    if(a.idx_time == b.idx_time){
        return 0;
    }
    return a.idx_time > b.idx_time ? 1 : -1;
}

router.post('/', function (req, res) {
    var recv_data = req.body;

    // 클라이언트(ios, android)에서는 room_name 이 사용자의 email 이다.
    //var access_key = recv_data.access_key;
    var room_name = recv_data.room_name;
    var latest_idx_time = recv_data.latest_idx_time;

    message_log.find({room_name : room_name}, function (err, result) {
       if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5800";
            send_obj.response = {message : "database error"};
            res.send(send_obj);
            res.end();
       }
       else{
           if(result.length == 0){
                // 저장된 로그 document 가 없음
                var new_log = new message_log();
                new_log.access_key = access_key;
                new_log.room_name = room_name;
                new_log.message_list = [];
                // 코드 추가 해야함

                new_log.save();
                var send_obj = new Object();
                send_obj.code = "3333";
                send_obj.response = { message : "new document is created" };
                res.send(send_obj);
                res.end();
           }else{
               // 저장된 로그 document 가 있음
                var tmp_arr = result[0].message_list;
                var msg_arr = new Array();
                tmp_arr.sort(cmp);

                for(var i = 0; i < tmp_arr.length; i++){
                    if(tmp_arr[i].idx_time > latest_idx_time){
                        msg_arr.push(tmp_arr[i]);
                    }
                }

                var send_obj = new Object();
                send_obj.code = "3334";
                send_obj.response = { message : "load message log", message_list :msg_arr };
                res.send(send_obj);
                res.end();

           }
       }
    });
});

module.exports = router;