var fcm = require('./set_fcm_server');
var members = require('../models/Member');

var pushBoxNotification = function (title, body) {
    members.find({doc_type : 'member_data'}, function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
        }else{
            if(result.length == 0){
                console.log('error occur for finding database');
            }else{
                for(var i = 0; i < result.length; i++){
                    //var userEmail = result[i].id_email;
                    var message = {
                        data : {
                            title : '[공지사항] 새로운 공지사항이 등록되었습니다.',
                            body : '공지사항 : ' + title,
                            notification_type : 0
                        },
                        priority : 'normal',
                        to : result[i].device_token,
                        notification : {
                            title : '[공지사항] 새로운 공지사항이 등록되었습니다.',
                            body : '공지사항 : ' + title,
                            notification_type : 0
                        }
                    };
                    fcm.send(message, function (err, response) {
                        if(err){
                            console.error(err);
                        }else{
                            console.log(response);
                        }
                    });
                }
            }
        }
    });
}

var pushChatNotification = function (id_email) {
    members.find({doc_type : "member_data", id_email : id_email}, function (err, result) {
        if(err){
            console.error(err);
        }else{
            if(result.length == 0){
                console.log('error occur for finding database');
            }else{
                var message = {
                    data : {
                        title : '[1:1문의] 1:1 문의 답변이 등록되었습니다.',
                        body : id_email + ' 님의 1:1 문의에 대한 답변이 등록되었습니다.',
                        notification_type : 2
                    },
                    to : result[0].device_token,
                    priority : 'normal',
                    notification : {
                        title : '[1:1문의] 1:1 문의 답변이 등록되었습니다.',
                        body : id_email + ' 님의 1:1 문의에 대한 답변이 등록되었습니다.',
                        notification_type : 2
                    }
                };
                fcm.send(message, function (err, response) {
                    if(err){
                        console.error(err);
                    }else{
                        console.log(response);
                    }
                });
            }
        }
    })
}

var pushClassUploadNotification = function () {
    members.find({doc_type : "member_data", certification : 2}, function (err, result) {
        if(err){
            console.error(err);
        }else{
            if(result.length == 0){
                console.log('error occur for finding database');
            }else{
                for(var i = 0; i < result.length; i++){
                    //var userEmail = result[i].id_email;
                    var message = {
                        data : {
                            title : '[W.O.D 등록] 내일의 W.O.D가 등록되었습니다.',
                            body : '내일의 W.O.D가 등록되었습니다.',
                            notification_type : 1
                        },
                        to : result[i].device_token,
                        priority : 'normal',
                        notification : {
                            title : '[W.O.D 등록] 내일의 W.O.D가 등록되었습니다.',
                            body : '내일의 W.O.D가 등록되었습니다.',
                            notification_type : 1
                        }
                    };
                    fcm.send(message, function (err, response) {
                        if(err){
                            console.error(err);
                        }else{
                            console.log(response);
                        }
                    });
                }
            }
        }
    });
}

module.exports = {
    pushBoxNotification : pushBoxNotification,
    pushChatNotification : pushChatNotification,
    pushClassUploadNotification : pushClassUploadNotification
}