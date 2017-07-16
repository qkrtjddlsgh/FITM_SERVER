/**
 * Created by Myown on 2017-07-14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberData = new Schema({
    id_access_key : String,
    id_email : String,
    name : String,
    phone_number : String,
    start_date : String,
    end_date : String,
    certification : String,
    doc_type : String
});

// model 함수의 arg1 : docuement type
// model 함수의 arg2 : 스키마 객체
// model 함수의 arg3 : collection name
var member = mongoose.model('member', memberData, 'members');

module.exports = member;