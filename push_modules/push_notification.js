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
                    var userEmail = result[i].id_email;
                    var message = {
                        data : {
                            title : title,
                            body : body
                        },
                        to : result[i].device_token,
                        notification_type : 0,
                        notification : {
                            title : title,
                            body : body
                        }
                    };
                    fcm.send(message, function (err, response) {
                        console.log(userEmail + ' , ' + message.to);
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
}