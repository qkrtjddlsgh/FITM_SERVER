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

router.post('/', function(req, res){

    var recv_data = req.body;

    chk.find({id_email:recv_data.id_email}, function (err, doc) {
       if(err){
           console.error(err.message);
       }

       if(doc.length == 0){
           var new_member = new chk();
           new_member.id_email = recv_data.id_email;
           new_member.doc_type = "member_ref";

           var add_data = new Object();

          new_member.save(function(err, room){
              // 새로운 member의 정보에 대한 참조 document를 저장
               if(err){
                   console.error(err.message);
               }
               else{
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
           new_member_data.certification = "false";
           new_member_data.doc_type = "member_data";
           new_member_data.birthday = null;
           new_member_data.gender = null;
           new_member_data.locker_num = null;
           new_member_data.locker_start = null;
           new_member_data.locker_finish = null;
           new_member_data.save();

           res.send(res_data);
           res.end();
       }
       else{

           var res_data = new Object();
           // 응답코드 1100 - DB에 저장된(등록된) 회원
           res_data.code = "1100";

           var add_data = new Object();
           add_data.access_key = doc[0]._id;
           res_data.response = add_data;

           // access_key로 DB의 Object의 id값을 리턴함
           res.send(res_data);
           res.end();
       }
    });
});

module.exports = router;