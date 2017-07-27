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
            var add_data = new Object();
            add_data.message = "Canceled Class";
            add_data.access_key = recv_data.access_key;

            var res_data = new Object();
            // 성공적으로 수업 삭제 시
            res_data.code = "1270";
            res_data.response = add_data;

            res.send(res_data);
            res.end();
        }
    })
});

module.exports = router;