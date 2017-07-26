// 수업 예약을 위한 모듈

// Time_Table model의 날짜에 맞는 수업 내용 확인
// participant의 길이를 20으로 제한
// 마지막 수업 이후에 reset 되게 설정

var express = require('express');
var router = express.Router();
var time_table = require('../../models/Time_Table');
var member = require('../../models/Member');

router.post('/', function(req, res){

});

module.exports = router;