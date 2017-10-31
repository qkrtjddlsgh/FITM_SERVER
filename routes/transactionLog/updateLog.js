var express = require('express');
var router = express.Router();
var transaction = require('../../models/transactionLog');

router.post('/update', function (req, res) {
    // params
    // date_idx : 수정하려는 document 의 인덱스값 (Number)
    // status : 수정하려는 내용의 상태 (String)
    // comment : 수정 사유, 추가 코멘트 (String)

    var findQuery = { date_idx : req.body.date_idx };
    var updateQuery = {$set : { status : req.body.status , comment : req.body.comment }};
    transaction.update(findQuery, updateQuery, function (err, result) {
        if(err){
            console.error(err);
            var sendObj = new Object();
            sendObj.code = '5800';
            sendObj.response = { message : 'database error' };
            res.send(sendObj);
            res.end();
        }else{
            //console.log(result);
            if(result.n == 1 && result.ok == 1){
                // document update success
                var sendObj = new Object();
                sendObj.code = '3790';
                transaction.find(findQuery, function (err, result) {
                    if(err){
                        sendObj.code = '5800';
                        sendObj.response = { message : 'database error' };
                        res.send(sendObj);
                        res.end();
                    }else{
                        if(result.length == 0){
                            sendObj.code = '4791';
                            sendObj.response = { message : 'update fail' };
                            res.send(sendObj);
                            res.end();
                        }else{
                            sendObj.response = result[0];
                            res.send(sendObj);
                            res.end();
                        }
                    }
                });
            }else{
                // document update fail
                var sendObj = new Object();
                sendObj.code = '4791';
                sendObj.response = { message : 'update fail' };
                res.send(sendObj);
                res.end();
            }
        }
    });
});

module.exports = router;