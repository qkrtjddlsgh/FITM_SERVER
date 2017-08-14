/**
 * Created by Park on 2017-07-21.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classInfo = require('./classInfo.js');

var classesData = new Schema({
    // 오늘의 와드 정보
    today_wod_name : String,
    today_wod_content : String,
    date : String,
    num_of_classes : Number,
    
    // 각 수업에 대한 정보
    classes : [
        classInfo
    ]
});

// model 함수의 arg1 : docuement type
// model 함수의 arg2 : 스키마 객체
// model 함수의 arg3 : collection name
var time_table = mongoose.model('time_table', classesData, 'time_tables');

module.exports = time_table;