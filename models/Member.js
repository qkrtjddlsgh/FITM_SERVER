/**
 * Created by Myown on 2017-07-14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberData = new Schema({
    id_access_key : String,
    id_email : String,
    name : String,
    phone_number : String,
    start_date : String,
    end_date : String,
    certification : String
});

var member = mongoose.model('member', memberData, 'members');

module.exports = member;