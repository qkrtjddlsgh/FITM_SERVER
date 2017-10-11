// certification을 수정하여 휴회원으로 등록하는 모듈

var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var new_state = recv_data.state;
    // state 0 : 미확인 state 1 : 수락 state 2 : 거절

    var set_data = {$set: {'remain_list.$.state': new_state}};

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
