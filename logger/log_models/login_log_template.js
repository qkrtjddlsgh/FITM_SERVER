var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginLogTemplate = new Schema({
    time : {type : Date, default : Date.now()},
    ip_of_client : String,
    access_key_of_client : String,
    req_url_of_client : String
});

// model 함수의 arg1 : docuement type
// model 함수의 arg2 : 스키마 객체
// model 함수의 arg3 : collection name

var loginLogTemplateSchem = mongoose.model('login_log_template', loginLogTemplate, 'server_logs');
module.exports = loginLogTemplateSchem;