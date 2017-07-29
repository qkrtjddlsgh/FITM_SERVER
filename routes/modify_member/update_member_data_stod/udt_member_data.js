/**
 * Created by Myown on 2017-07-16.
 */

// data의 update 기능을 수행하는 모듈
// 전달된 post는 다음과 같음
// id_access_key : 액세스키, data : 교체할 doc 정보
// $set 쿼리문을 사용하기 때문에 교체할 필드의 정보를 미리 결정해야한다.
// 교체할 필드의 정보는
// - name
// - phone_number
// - start_date
// - end_date
// ( 서버 <-> 매니저 프로그램)

var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){

    var recv_data = req.body;

    // 필드의 수정은 변수의 추가를 통해서 구현하면 됨.
    console.log(recv_data);

    var udt_data_id = recv_data.access_key;
    var udt_data_locker_finish = recv_data.locker_finish;
    var udt_data_locker_start = recv_data.locker_start;
    var udt_data_locker_num = recv_data.locker_num;
    var udt_data_gender = recv_data.gender;
    var udt_data_birthday = recv_data.birthday;
    var udt_data_certification = recv_data.certification;
    var udt_data_name = recv_data.name;
    var udt_data_phone_number = recv_data.phone_number;
    var udt_data_start_date = recv_data.start_date;
    var udt_data_finish_date = recv_data.finish_date;
    var udt_data_remain_break_day = recv_data.remain_break_day;
    var set_data = { $set: {gender:udt_data_gender, name : udt_data_name, phone_number: udt_data_phone_number, start_date: udt_data_start_date, finish_date:udt_data_finish_date,locker_finish:udt_data_locker_finish, locker_start:udt_data_locker_start, locker_num:udt_data_locker_num, certification: udt_data_certification, birthday:udt_data_birthday, remain_break_day:udt_data_remain_break_day}};

    members.update({access_key:udt_data_id, doc_type:"member_data"}, set_data, function (err, result) {
        console.log("update");
        if(err){
            console.log(err.message);
        }
        if(result.n == 0){
            console.log("no docs");
            var send_data = new Object();
            send_data.code = "5100";
            send_data.response = {error_msg : "not exist access_key"};
            res.send(send_data);
            res.end();
        }
        else{
            console.log(result);
            members.find({access_key:udt_data_id, doc_type:"member_data"}, function (err, result) {
                console.log("find");
                if(err){
                    console.error(err.message);
                }

                // 응답코드 : 2100
                // (Server <-> Desktop App.) 에서 회원 정보 변경이 성공적으로 수행됨.

                var send_data = new Object();
                send_data.code = "2100";
                send_data.response = result[0];
                res.send(send_data);
                res.end();
            });
        }
    });
});

module.exports = router;