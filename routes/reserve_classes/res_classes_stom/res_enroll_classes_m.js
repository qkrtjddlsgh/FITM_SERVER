var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var date = recv_data.date;
    var access_key = recv_data.access_key;
    var class_num = recv_data.class_num;

    var query = {$push : {"classes.$.participant" : access_key}};

    time_table.update({date:date, classes:{$elemMatch : {class_num : class_num}}},query,function (err, result) {
        if(err){
            console.error(err.message);
        }
        else{
            console.log(result[0]);
        }
    });
});

module.exports = router;