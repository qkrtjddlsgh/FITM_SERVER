var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movementData = new Schema({
    movement_name : String,
    movement_count : Number
});

var movement= mongoose.model('movement', movementData, 'movements');

module.exports = movement;