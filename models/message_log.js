var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageLog = new Schema({
    access_key : String,
    room_name : String,
    name : String,
    message_list : [{
        time : {type : Date, default : Date.now()},
        access_key : String,
        sender_name : String,
        message : String
    }]
});

var messageLogSchem = mongoose.model('messageLog', messageLog, 'message_log');

module.exports = messageLogSchem;