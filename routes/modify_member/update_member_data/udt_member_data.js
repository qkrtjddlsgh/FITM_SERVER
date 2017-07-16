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
var chk = require('../../../models/CheckEmail');

router.post('/', function(req, res){

    var recv_data = req.body;
    var udt_data_id = recv_data.id_access_key;
    var udt_data_name = recv_data.udt_data.name;
    var udt_data_phone_number = recv_data.udt_data.phone_number;
    var udt_data_start_date = recv_data.udt_data.start_date;
    var udt_data_end_date = recv_data.udt_data.end_date;
    var set_data = { $set: {name : udt_data_name, phone_number: udt_data_phone_number, start_date: udt_data_start_date, end_date:udt_data_end_date}};

    console.log(recv_data.id_access_key);
    console.log(recv_data.udt_data);

    chk.updateOne({id_access_key: udt_data_id, doc_type: "member_data"}, set_data).then(function (result){
        console.log(result);
    }).catch(function(err){
        console.error(err.message)
    });

});

module.exports = router;