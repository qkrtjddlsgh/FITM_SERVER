var express = require('express');
var router = express.Router();
var today = require('../../../util_modules/date_manip/getToday');
var members = require('../../../models/Member');

router.post('/', function(req, res){

    var recv_data = req.body;

    var start_date = recv_data.start_date;
    var end_date = recv_data.end_date;
    var access_key = recv_data.access_key;
    var name = recv_data.name;
    var comments = recv_data.comments;
    var check = 1;

    var s_year = Number(start_date.substr(0,4));
    var s_month = Number(start_date.substr(4,2))-1;
    var s_day = Number(start_date.substr(6,2))+1;

    var e_year = Number(end_date.substr(0,4));
    var e_month = Number(end_date.substr(4,2))-1;
    var e_day = Number(end_date.substr(6,2))+1;

    var start = new Date(s_year, s_month, s_day);
    var end = new Date(e_year, e_month, e_day);

    var new_start = today(start);
    var new_end = today(end);

    var diff = new_end - new_start + 1;
    var before_remain = 0;

    members.find({doc_type: "remain_list"}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var new_remain_list = new members();
            new_remain_list.doc_type = "remain_list";
            new_remain_list.remain_list = [{date: today(new Date()), state: 0, name: name, access_key: access_key, comments: comments, start_date: start_date, end_date: end_date, message: "", diff: diff}];
            new_remain_list.save();

            var res_data = new Object();
            res_data.code = "9999";

            res.send(res_data);
            res.end();
        }
        else {
            members.find({access_key: access_key}, function (err, doc) {
                if (err) {
                    console.error(err.message);
                }
                else {
                    before_remain = doc[0].remain_break_day;
                }
            });

            if (diff < before_remain) {
                var res_data = new Object();
                res_data.code = "6666";
                res_data.message = "you doesn't have remain_break_day";

                res.send(res_data);
                res.end();
            }
            else {
                for (var i = 0; i < result[0].remain_list.length; i++) {
                    if (result[0].remain_list[i].state == 0 && result[0].remain_list[i].access_key == access_key) {
                        check = 0;

                        var res_data = new Object();
                        res_data.code = "7777";
                        res_data.message = "Already assigned, Wait";

                        res.send(res_data);
                        res.end();
                    }
                    else if (result[0].remain_list[i].state == 1 && result[0].remain_list[i].access_key == access_key) {
                        check = 0;

                        var res_data = new Object();
                        res_data.code = "7777";
                        res_data.message = "Already accepted";

                        res.send(res_data);
                        res.end();
                    }
                }

                if (check == 1) {
                    var query = {
                        $push: {
                            remain_list: {
                                date: today(new Date()),
                                state: 0,
                                name: name,
                                access_key: access_key,
                                comments: comments,
                                start_date: start_date,
                                end_date: end_date,
                                message: "",
                                diff: diff
                            }
                        }
                    };

                    members.update({doc_type: "remain_list"}, query, function (err, doc) {
                        if (err) {
                            console.error(err.message);
                        }
                    });

                    var res_data = new Object();
                    res_data.code = "8888";

                    res.send(res_data);
                    res.end();
                }

            }
        }
    });

});

module.exports = router;
