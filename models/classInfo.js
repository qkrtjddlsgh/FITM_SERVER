/**
 * Created by Myown on 2017-07-31.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classInfo = new Schema({
    class_num: String,
    start_time: String,
    finish_time: String,
    max_participant : Number,
    participant: []
});

//var classInfoSchem = mongoose.model('class_info', classInfo, 'time_tables');

module.exports = classInfo;