var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marketData = new Schema({
    date : String,
    // 1 : 판매중, 0 : 재고소진 및 판매완료
    state : String,
    name : String,
    price : String,
    out_content : String,
    in_content : String,
    num_of_item : Number,
    purchase_list : [],
    image_list : []
});

var smallmarket = mongoose.model('smallmarket', marketData, 'smallmarkets');

module.exports = smallmarket;