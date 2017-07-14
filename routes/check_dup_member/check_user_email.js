/**
 * Created by Myown on 2017-07-14.
 */
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
           var new_member_data = new member();
           new_member_data.id_access_key = new_member._id;
           new_member_data.id_email = recv_data.id_email;
           new_member_data.name = null;
           new_member_data.phone_number = null;
           new_member_data.start_date = null;
           new_member_data.end_date = null;
           new_member_data.certification = "false";
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