// 수업 예약을 위한 모듈

// Time_Table model의 날짜에 맞는 수업 내용 확인
// participant의 길이를 20으로 제한
// 마지막 수업 이후에 reset 되게 설정

var express = require('express');
var router = express.Router();
var time_table = require('../../models/Time_Table');
var member = require('../../models/Member');

router.post('/', function(req, res){

    var recv_data = req.body;

    var date = recv_data.date;
    var class_num = recv_data.class_num;
    var access_key = recv_data.access_key;
    // var name = recv_data.name;

    time_table.find({date:date, class_num:class_num })




});

module.exports = router;