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

    var access_key = recv_data.access_key;

    var first_idx_time = recv_data.first_idx_time;
    var last_idx_time = recv_data.last_idx_time;

    message_log.find({access_key : access_key}, function (err, result) {
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
                new_log.room_name = access_key + "-room";
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
                tmp_arr.sort(cmp);
                var msg_arr = new Array();

                var max_capacity = 5000;

                if(tmp_arr.length > max_capacity){
                    var remove_cnt = tmp_arr.length - max_capacity - 1;
                }
                else{
                    var remove_cnt = 0;
                }

                //var remove_idx = tmp_arr[remove_cnt-1].idx_time
                console.log(remove_cnt);
                var remove_time = tmp_arr[remove_cnt].idx_time;
                console.log(remove_time);

                // 메시지의 저장 용량의 한도를 초과하면 초과한만큼 지운다. ( 현재 허용량 : 5000개 )
                var remove_query = { $pull : { message_list : { idx_time : { $lt : remove_time}}}};
                message_log.update({access_key : access_key}, remove_query, function (err, result) {
                    if(err){
                        console.error(JSON.stringify(err));
                    }else{
                        console.log(JSON.stringify(result));
                    }
                });

                if(first_idx_time == -1 && last_idx_time == -1){
                    for(var i = 0; i < tmp_arr.length; i++){
                        msg_arr.push(tmp_arr[i]);
                    }
                }else {
                    for (var i = remove_cnt; i < tmp_arr.length; i++) {
                        if (last_idx_time <= tmp_arr[i].idx_time) {
                            msg_arr.push(tmp_arr[i]);
                        }
                    }
                }

                var send_obj = new Object();
                send_obj.code = "3334";
                send_obj.response = { message : "load message log", logs :msg_arr };
                res.send(send_obj);
                res.end();
           }
       }
    });
});

module.exports = router;