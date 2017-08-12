// 특정 회원의 image를 불러오는 모듈
// 작업중.. 현재 FITM_SERVER에 name의 image 다운로드

var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

AWS.config.update({accessKeyId: 'AKIAIRVEKU6CRPS2CNSQ',
    secretAccessKey: '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',
    region: 'ap-northeast-2'});

var s3 = new AWS.S3();

router.post('/', function(req, res){
    var recv_data = req.body;

    var name = recv_data.name;

    if(!req.body.name){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        var file = require('fs').createWriteStream(name);
        var params = {Bucket: 'fitmbucket', Key: name};
        s3.getObject(params).createReadStream().pipe(file);

        var send_data = new Object();
        send_data.code = "9999";
        send_data.response = name;

        res.send(send_data);
        res.end();
    }
});

module.exports = router;
