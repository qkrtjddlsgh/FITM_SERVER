// certification을 수정하여 휴회원으로 등록하는 모듈

var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var new_state = recv_data.state;
    var new_message = recv_data.message;
    // state 0 : 미확인 state 1 : 수락 state 2 : 거절
    var temp = 0;

    if(new_state == 1){
        new_message = "휴회신청이 승인되었습니다.";

        members.find({doc_type: "remain_list"}, function(err, doc){
            if(err){
                console.error(err.message);
            }
            else{
                for(var i=0; i<doc[0].remain_list.length; i++){
                    if(doc[0].remain_list[i].access_key == access_key){
                        temp = doc[0].remain_list[i].diff;
                        break;
                    }
                }
            }
        });

        members.find({access_key: access_key, doc_type: "member_data"}, function(err, result){
            if(err){
                console.error(err.message);
            }
            else{
                var new_remain_break_day = result[0].remain_break_day - temp;

                var query = {$set: {remain_break_day: new_remain_break_day}};

                members.update({access_key: access_key, doc_type: "member_data"}, query, function(err, result){
                    if(err){
                        console.error(err.message);
                    }
                });
            }
        });
    }

    var set_data = {$set: {'remain_list.$.state': new_state, 'remain_list.$.message': new_message}};

    members.update({doc_type: "remain_list", remain_list: {$elemMatch: {access_key: access_key}}}, set_data, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            // 해당 access_key를 찾아서 state을 1로 수정해야됨
            // 모바일측 휴회신청 여부 확인 (state로)

            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "Update Correctly";

            res.send(res_data);
            res.end();
        }
    })

});

module.exports = router;
