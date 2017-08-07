// s3의 이미지 목록을 불러오는 모듈
// 작업중.. 현재 로그로만 찍힘

var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

AWS.config.update({accessKeyId: 'AKIAIRVEKU6CRPS2CNSQ',
    secretAccessKey: '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',
    region: 'ap-northeast-2'});

var s3 = new AWS.S3();

router.post('/', function(req, res){
    var add_data = new Array();
    var send_data = new Object();

    s3.listObjects({Bucket: 'fitmbucket'}).on('success', function handlePage(response) {
        for(var name in response.data.Contents){
            add_data.push(response.data.Contents[name].Key);
        }

        console.log(add_data);

        if (response.hasNextPage()) {
            response.nextPage().on('success', handlePage).send();
        }
    }).send();

    send_data.code = "9999";
    send_data.message = 'Check the Log!!';

    res.send(send_data);
    res.end();
});

module.exports = router;
