/**
 * Created by Myown on 2017-07-14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckEmail = new Schema({
    id_email : String
});

var check_email = mongoose.model('check_mail', CheckEmail, 'members');

module.exports = check_email;