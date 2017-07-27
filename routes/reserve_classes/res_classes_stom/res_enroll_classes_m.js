var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var date = recv_data.date;
    var access_key = recv_data.access_key;
    var class_num = recv_data.class_num;

    var query = {$addToSet : {"classes.$.participant" : access_key}};

    time_table.update({date:date, classes:{$elemMatch : {class_num : class_num}}},query,function (err, result) {
        if(err){
            console.error(err.message);
        }
        else{
          time_table.find({date : date}, function (err, result) {
                var add_data = new Object();
                add_data.date = recv_data.date;
                add_data.class_num = recv_data.class_num;
                add_data.start_time = result[0].classes[class_num-1].start_time;
                add_data.finish_time = result[0].classes[class_num-1].finish_time;
                add_data.access_key = recv_data.access_key;

                var res_data = new Object();
                // 성공적으로 수업 등록 시
                res_data.code = "1350";
                res_data.response = add_data;

                res.send(res_data);
                res.end();
           })
        }
    });
});

module.exports = router;