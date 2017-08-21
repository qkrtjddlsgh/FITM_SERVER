/**
 * Created by Myown on 2017-08-18.
 */

var express = require('express');
var router = express.Router();
var message_log = require('../models/message_log');

function cmp(a ,b){
    if(a.message_index == b.message_indx){
        return 0;
    }
    return a.message_index > b.message_index ? 1 : -1;
}

router.post('/', function (req, res) {
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var latest_message_index = recv_data.latest_message_index;

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
                // 정렬이 잘 되는지 콘솔로 찍는 중
                for(var i = 0; i < tmp_arr.length; i++){
                    console.log(JSON.stringify(tmp_arr[i]));
                }
                var send_obj = new Object();
                send_obj.code = "3333";
                send_obj.response = { message : "new document is created" };
                res.send(send_obj);
                res.end();
           }
       }
    });
});

module.exports = router;