/**
 * Created by Myown on 2017-07-14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckEmail = new Schema({
    id_email : String,
    doc_type : String
});

// model 함수의 arg1 : docuement type
// model 함수의 arg2 : 스키마 객체
// model 함수의 arg3 : collection name
var check_email = mongoose.model('check_mail', CheckEmail, 'members');

module.exports = check_email;