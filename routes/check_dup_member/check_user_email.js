/**
 * Created by Myown on 2017-07-14.
 */

// 로그인을 위한 모듈
// 회원의 정보(key는 email)가 등록되어 있지 않으면 docment를 생성한다.
// (서버 <-> 모바일 어플리케이션)

var express = require('express');
var router = express.Router();
var chk = require('../../models/CheckEmail');
var member = require('../../models/Member');
var loginLogger = require('../../logger/log_modules/login_logger');

router.post('/', function(req, res){

    var recv_data = req.body;

    if(!req.body.id_email){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        chk.find({id_email: recv_data.id_email}, function (err, doc) {
            if (err) {
                console.error(err.message);
            }
            if (doc.length == 0) {
                var new_member = new chk();
                new_member.id_email = recv_data.id_email;
                new_member.doc_type = "member_ref";

                var add_data = new Object();

                new_member.save(function (err, room) {
                    // 새로운 member의 정보에 대한 참조 document를 저장
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        return room;
                    }
                });

                add_data.access_key = new_member._id;

                var res_data = new Object();
                // 응답코드 1101 - DB에 저장되어있지 않은 유저의 정보
                res_data.code = "1101";

                res_data.response = add_data;

                // 새로운 member의 정보에 대한 전체 정보 document를 저장
                // 170717 : 스키마 변경에 의한 코드 수정(birthday 등 5개 키 추가)
                var new_member_data = new member();
                new_member_data.access_key = new_member._id;
                new_member_data.id_email = recv_data.id_email;
                new_member_data.name = null;
                new_member_data.phone_number = null;
                new_member_data.start_date = null;
                new_member_data.finish_date = null;
                new_member_data.remain_break_day = 0;
                new_member_data.certification = 0;
                new_member_data.doc_type = "member_data";
                new_member_data.birthday = null;
                new_member_data.gender = null;
                new_member_data.locker_num = null;
                new_member_data.locker_start = null;
                new_member_data.locker_finish = null;
                new_member_data.check_register = 0;
                new_member_data.save();

                console.log("new member is registered");

                res.send(res_data);
                res.end();
            }
            else {
                member.find({id_email: recv_data.id_email, doc_type: 'member_data'}, function(err, result){
                    if(err){
                        console.error(err.message);
                    }
                    else{
                        var res_data = new Object();
                        // 응답코드 1100 - DB에 저장된(등록된) 회원
                        res_data.code = "1100";

                        console.log(result);
                        //add_data.access_key = result[0].access_key;
                        //add_data.check_register = result[0].check_register;
                        //res_data.response = result[0];

                        var add_data = new Object();
                        add_data.check_register = result[0].check_register;
                        add_data.locker_finish = result[0].locker_finish.substr(0,4) + "/" + result[0].locker_finish.substr(4,2) + "/" + result[0].locker_finish.substr(6,2);
                        add_data.locker_start = result[0].locker_start.substr(0,4) + "/" + result[0].locker_start.substr(4,2) + "/" + result[0].locker_start.substr(6,2);
                        add_data.locker_num = result[0].locker_num;
                        add_data.gender = result[0].gender;
                        add_data.birthday = result[0].birthday;
                        add_data.doc_type = result[0].doc_type;
                        add_data.certification = result[0].certification;
                        add_data.remain_break_day = result[0].remain_break_day;
                        add_data.finish_date = result[0].finish_date.substr(0,4) + "/" + result[0].finish_date.substr(4,2) + "/" + result[0].finish_date.substr(6,2);;
                        add_data.start_date = result[0].start_date.substr(0,4) + "/" + result[0].start_date.substr(4,2) + "/" + result[0].start_date.substr(6,2);
                        add_data.phone_number = result[0].phone_number;
                        add_data.name = result[0].name;
                        add_data.id_email = result[0].id_email;
                        add_data.access_key = result[0].access_key;

                        res_data.response = add_data;

                        // Login 과정에 대한 logger
                        var user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                        if (user_ip.substr(0, 7) == "::ffff:") {
                            user_ip = user_ip.substr(7)
                        }
                        loginLogger(user_ip, 'check_user_email', add_data.access_key);

                        // access_key로 DB의 Object의 id값을 리턴함
                        res.send(res_data);
                        res.end();
                    }
                })
            }
        });
    }
});

module.exports = router;