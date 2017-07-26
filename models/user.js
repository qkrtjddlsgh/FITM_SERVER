/**
 * Created by Myown on 2017-07-10.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    name : String,
    number : String,
    email : String
});

var users = mongoose.model('users', user);

module.exports = users;