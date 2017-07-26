var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var access_key = recv_data.access_key;

    var query = {$pull : { "classes.$.participant" : access_key}};

    time_table.update({classes : {$elemMatch : {participant : access_key}}}, query, function (err , result) {
        if(err){
            console.error(err.message);
        }else {
            console.log(result);
        }
    })
});

module.exports = router;