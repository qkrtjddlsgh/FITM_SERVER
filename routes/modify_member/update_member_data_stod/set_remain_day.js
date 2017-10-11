var express = require('express');
var router = express.Router();
var today = require('../../../util_modules/date_manip/getToday');
var members = require('../../../models/Member');

router.post('/', function(req, res){

    var recv_data = req.body;

    var start_date = recv_data.start_date;
    var num_of_day = recv_data.num_of_day;
    var access_key = recv_data.access_key;
    var name = recv_data.name;
    var comments = recv_data.comments;

    members.find({doc_type: "remain_list"}, function(err, result){
        if(err){
            console.error(err.message);
        }
        // getToday(new Date())
        if(result.length == 0){
            var new_remain_list = new members();
            new_remain_list.doc_type = "remain_list";
            new_remain_list.remain_list = [{date: today(new Date()), state: 0, name: name, access_key: access_key, comments: comments, start_date: start_date, num_of_day: num_of_day}];
            new_remain_list.save();

            var res_data = new Object();
            res_data.code = "9999";

            res.send(res_data);
            res.end();
        }
        else{
            var query = {$push: {remain_list: {date: today(new Date()), state: 0, name: name, access_key: access_key, comments: comments, start_date: start_date, num_of_day: num_of_day}}};

            members.update({doc_type: "remain_list"}, query, function(err, doc){
                if(err){
                    console.error(err.message);
                }
            });

            var res_data = new Object();
            res_data.code = "8888";

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;
