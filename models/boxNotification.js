var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dateObj = require('../util_modules/date_manip/getTodayDateObj');
var time = require('../util_modules/date_manip/getToday');
var timeObj = require('../util_modules/date_manip/getTodayObj');

var boxNotification = new Schema({

    notification_idx : Number,
    create_date : { type : String, default : time(dateObj()) },
    create_date_obj : {
        yy : { type : String, default : timeObj(dateObj()).year },
        mm : { type : String, default : timeObj(dateObj()).month },
        dd : { type : String, default : timeObj(dateObj()).day },
        h : { type : String, default : timeObj(dateObj()).hour },
        m : { type : String, default : timeObj(dateObj()).minute }
    },
    title : String,
    body : String

});

// model 함수의 arg1 : document type
// model 함수의 arg2 : 스키마 객체
// model 함수의 arg3 : collection name

var boxNotificationSchem = mongoose.model('boxNotification', boxNotification, 'boxNotifications');
module.exports = boxNotificationSchem;