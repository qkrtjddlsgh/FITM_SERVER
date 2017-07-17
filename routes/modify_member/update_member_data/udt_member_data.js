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

    var udt_data_id = recv_data.access_key;
    var udt_data_name = recv_data.udt_data.name;
    var udt_data_phone_number = recv_data.udt_data.phone_number;
    var udt_data_start_date = recv_data.udt_data.start_date;
    var udt_data_finish_date = recv_data.udt_data.finish_date;
    var set_data = { $set: {name : udt_data_name, phone_number: udt_data_phone_number, start_date: udt_data_start_date, finish_date:udt_data_finish_date}};

    members.update({access_key:udt_data_id, doc_type:"member_data"}, set_data, function (err, result) {
        if(err){
            console.log(err.message);
        }
        if(result.n == 0){
            console.log("no docs");
            var send_data = res_data("5100", {message : "access key not exist"});
            res.send(send_data);
            res.end();
        }
        else{
            console.log(result);
            members.findOne({access_key:udt_data_id}, function (err, result) {

                // 응답코드 : 2100
                // (Server <-> Desktop App.) 에서 회원 정보 변경이 성공적으로 수행됨.

                var send_data = res_data("2100", result);
                res.send(send_data);
                res.end();
            });
        }
    });

});

var res_data = function (code, res_obj) {
    var ret = new Object();
    ret.code = code;
    ret.response = res_obj;

    return ret;
}

module.exports = router;