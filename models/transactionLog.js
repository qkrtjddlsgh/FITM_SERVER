/**
 * Created by Myown on 2017-10-13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionLog = new Schema({
    name : String,
    date_year : Number,
    date_month : Number,
    date_day : Number,
    transaction_tag : String,
    item_name : { type : String, default : 'NA' },
    amount : Number,
    payment_type : {type : String, default : 'cash' },
    date : Number
});

var transactionLogSchem = mongoose.model('transactionLog', transactionLog, 'transactionLogs');
module.exports = transactionLogSchem;