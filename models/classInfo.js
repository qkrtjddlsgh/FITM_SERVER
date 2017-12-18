/**
 * Created by Myown on 2017-07-31.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var participantSchem = new Schema({
    access_key : String,
    name : String,
    id_email : String,
    comments : String,
    user_gender : String,
    attend : String
})*/

var classInfo = new Schema({
    class_num: String,
    start_time: String,
    finish_time: String,
    max_participant : Number,
    participant: []
    //participant: [ participantSchem ]
});

module.exports = classInfo;