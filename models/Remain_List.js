var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var Remain_List_data = new Schema({
    start_date: String,
    end_date: String,
    diff: Number,
    id_email: String,
    name: String,
    comments: String,
    message: String,
    // 미확인(0), 수락(1), 거절(2), 옛날것(3)
    state: Number
});

var remain_list = mongoose.model('remain_list', Remain_List_data, 'remain_lists');

module.exports = remain_list;