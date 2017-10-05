var fcm = require('./set_fcm_server');
var members = require('../models/Member');

var pushBoxNotification = function (title, body) {

    var message = {
        data : {
            title : title,
            body : body
        },
        message : "Hi",
        notification_type : 0,
        notification : {
            title : title,
            body : body
        }
    };

    members.find({doc_type : 'member_data'}, function (err, result) {
        if(err){
            console.error(JSON.stringify(err));
        }else{
            if(result.length == 0){
                console.log('error occur for finding database');
            }else{
                for(var i = 0; i < result.length; i++){
                    message.to = result[i].device_token;
                    fcm.send(message, function (err, response) {
                        if(err){
                            console.error(err);
                        }else{
                            console.log(response + ' to : ' + result[i].id_email);
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