/**
 * Created by Myown on 2017-08-10.
 */

var express = require('express');
var router = express.Router();
var server_key = "AAAAwf54n18:APA91bEDhsIEYnN3PUVR8DAxS-C6AN9K2xZYqlxVntRSiw65hYEYHubvLVfAk6oR0892CAuljAHv-3pkMaBVaJsqP5jjaJbmEGwoR9PVZxYy3BebkgbzEsb3ZUPvx8vrBp3kxC2oO4uj";
var FCM = new require('fcm-push');
var fcm = new FCM(server_key);

// 1. firebase 프로젝트를 생성하고, 보낼 client 앱을 등록한다.
// 2. 해당 client의 플랫폼 콘솔(구글 개발자 콘솔, 애플?)에 앱을 등록한다.
// 3. 키를 얻어서 메시지 전송

var message = {
    to : 'fDzvpwDk5EU:APA91bEOEz-phJfg37h56iUzRs_IN9AeguERPONf-VpM17qEOTSX_2AX0H8rJwUEWdNekFZPSaSPmBfcChmKZZsY55K5FieapphFpVRDtWLBFsCCnJA7za1HFwSCQncy5uHKomuGBidN',
    data : {
        message : '테스트 푸시입니다.'
    },
    message : "Hi",
    notification : {
        title : 'title of your push notification',
        body : 'body of your push notification'
    }
};

router.post('/', function (req, res) {
    var recv_data = req.body;
    var push_title = recv_data.title;
    var push_body = recv_data.body;

    var obj = new Object();
    obj.title = push_title;
    obj.body = push_body;

    message.data = obj;

    fcm.send(message, function (err, response) {
       if(err){
            console.error(JSON.stringify(err));
            var send_obj = new Object();
            send_obj.code = "5300";
            send_obj.response = { message : "sent failed" };
            res.send(send_obj);
            res.end();
       }else {
            console.log(JSON.stringify(obj) + "\nSuccessfully sent with response : " + response);
            var send_obj = new Object();
            send_obj.code = "3300";
            send_obj.response = { message : "push message sent successfully"};
            res.send(send_obj);
            res.end();
       }
    });
});

module.exports = router;