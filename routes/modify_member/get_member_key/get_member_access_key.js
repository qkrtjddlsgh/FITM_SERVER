/**
 * Created by Myown on 2017-07-16.
 */

// data의 update를 위해서
// 등록된 memeber의 access key를 받음
// ( 서버 <-> 매니저 프로그램)

var express = require('express');
var router = express.Router();
var chk = require('../../../models/CheckEmail');

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
        chk.find({id_email: recv_data.id_email, doc_type: "member_ref"}).then(function (doc) {
            // 응답코드 : 1200
            // 등록된 회원의 email을 통한 access_key를 성공적으로 찾음

            var res_data = new Object();
            res_data.code = "1200";

            var add_data2 = new Object();
            add_data2.access_key = doc[0]._id;

            res_data.response = add_data2;
            res.send(res_data);
            res.end();

        }).catch(function (err) {
            console.error(err.message);
            res.end('error occured.');
        });
    }
});

module.exports = router;