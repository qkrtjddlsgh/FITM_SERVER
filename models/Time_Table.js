/**
 * Created by Park on 2017-07-21.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classInfo = require('./classInfo.js');

var classesData = new Schema({
    // 수업시간의 날짜
    // 수업시간의 개수
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