/**
 * Created by Myown on 2017-07-16.
 */

// data의 update를 위해서
// 등록된 memeber의 전체 data를 받음
// ( 서버 <-> 매니저 프로그램)

var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    if(!req.body.access_key){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        members.find({access_key: recv_data.access_key, doc_type: "member_data"}).then(function (doc) {
            // 응답코드 : 1210
            // 등록된 회원의 access_key를 통한 전체 data를 성공적으로 찾음

            var res_data = new Object();
            res_data.code = "1210";

            res_data.response = doc[0];
            res.send(res_data);
            res.end();

        }).catch(function (err) {
            console.error(err.message);
            res.end('error occured.');
        });
    }
});

module.exports = router;