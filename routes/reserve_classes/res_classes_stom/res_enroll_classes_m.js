var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var date = recv_data.date;
    var class_num = recv_data.class_num;
    var name = recv_data.name;
    var access_key = recv_data.access_key;
    var comments = recv_data.comments;

    var query = {$addToSet : {"classes.$.participant" : {"name" : name, "access_key" : access_key, "comments" : comments}}};

    time_table.update({classes : {$elemMatch : {participant : {"name" : name, "access_key" : access_key, "comments" : comments}}}}, query, function (err , result) {
        if(err){
            console.error(err.message);
        }

        time_table.find({date : date},function(err, result){
            var chk_data = new Object();
            chk_data.count =  result[0].classes[class_num-1].participant.length;
            chk_data.max_participant = result[0].classes[class_num-1].max_participant;

            if(err){
                console.error(err.message);
            }
            if(chk_data.count >= chk_data.max_participant){
                var query = {$addToSet : {"classes.$.participant" : {"name" : name, "access_key" : access_key, "comments" : comments}}};

                time_table.update({classes : {$elemMatch : {participant : {"name" : name, "access_key" : access_key, "comments" : comments}}}}, query, function (err , result) {
                    if(err){
                        console.error(err.message);
                    }
                    else {
                        var add_data = new Object();
                        add_data.message = "Full reservation";
                        add_data.access_key = recv_data.access_key;
                        add_data.name = recv_data.name;
                        add_data.comments = recv_data.comments;

                        var res_data = new Object();
                        // 참가인원이 꽉차서 더 못받는 경우
                        res_data.code = "1280";
                        res_data.response = add_data;

                        res.send(res_data);
                        res.end();
                    }
                })
            }
            else{
                time_table.find({date : date}, function (err, result) {
                    var add_data = new Object();

                    add_data.date = recv_data.date;
                    add_data.class_num = recv_data.class_num;
                    add_data.start_time = result[0].classes[class_num-1].start_time;
                    add_data.finish_time = result[0].classes[class_num-1].finish_time;
                    add_data.access_key = recv_data.access_key;
                    add_data.name = recv_data.name;
                    add_data.comments = recv_data.comments;

                    var res_data = new Object();
                    // 성공적으로 수업 등록 시
                    res_data.code = "1350";
                    res_data.response = add_data;

                    res.send(res_data);
                    res.end();
                })
            }
        })
    });
});

module.exports = router;