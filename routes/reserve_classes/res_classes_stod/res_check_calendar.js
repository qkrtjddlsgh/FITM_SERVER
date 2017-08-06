var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {

    time_table.find().sort("submitted").exec(function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            var send_data = new Object();
            send_data.code = "6500";

            var add_data = new Object();
            add_data.result = doc;

            send_data.response = add_data;

            res.send(send_data);
            res.end();
        }
    });
});

module.exports = router;