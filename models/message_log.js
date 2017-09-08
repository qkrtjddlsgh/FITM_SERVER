var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageLog = new Schema({
    access_key : String,
    room_name : String,
    name : String,
    message_list : [{
        time : {type : Date, default : Date.now()},
        access_key : String,
        sender : String,
        message : String,
        message_idx : Number,
        message_time : {
            year : String,
            month : String,
            day : String,
            hour : String,
            minute : String
        },
        idx_time : Number
    }]
});

var messageLogSchem = mongoose.model('messageLog', messageLog, 'message_log');

module.exports = messageLogSchem;