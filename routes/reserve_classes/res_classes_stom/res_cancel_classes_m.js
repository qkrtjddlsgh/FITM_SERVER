var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var name = recv_data.name;
    var comments = recv_data.comments;

    var query = {$pull : { "classes.$.participant" : {"name" : name, "access_key" : access_key, "comments" : comments}}};

    time_table.update({classes : {$elemMatch : {participant : {"name" : name, "access_key" : access_key, "comments" : comments}}}}, query, function (err , result) {
        if(err){
            console.error(err.message);
        }else {
            var add_data = new Object();
            add_data.message = "Canceled Class";
            add_data.name = recv_data.name;
            add_data.comments = recv_data.comments;

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