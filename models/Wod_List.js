var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var Wod_List_data = new Schema({
    wod_name : String,
    wod_content : String,
    // recent : 모든 today_wod, naming : 상용 wod
    doc_type : String,
    num_of_movements : Number,

    // today_wod의 movement_list
    movement_list : []
});

var wod_list = mongoose.model('wod_list', Wod_List_data, 'wod_lists');

module.exports = wod_list;