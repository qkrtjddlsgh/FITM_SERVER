/**
 * Created by Myown on 2017-07-26.
 */
var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;
    var access_key = recv_data.access_key;
    
    time_table.find({classes : {$elemMatch : {participant : access_key}}}, function (err, result) {
        if(err){
            console.error(err.message);
        }
        else{
            if(result.length == 0){
                var send_data = new Object();
                send_data.code = "2170";

                var add_data = new Object();
                add_data.message = "not enrolled";
                send_data.response = add_data;

                res.send(send_data);
                res.end();
            }
            else{
                for(var i = 0; i < result[0].classes.length;i++){
                    for(var j = 0; j < result[0].classes[i].participant.length; j++){
                        if(result[0].classes[i].participant[j] == access_key){
                            var send_data = new Object();
                            send_data.code = "1170";
                            var add_data = new Object();
                            add_data.date = result[0].date;
                            add_data.class_num = result[0].classes[i].class_num;
                            add_data.start_time = result[0].classes[i].start_time;
                            add_data.finish_time = result[0].classes[i].finish_time;
                            send_data.response = add_data;
                            res.send(send_data);
                            res.end();
                        }
                    }
                }
            }
        }
    });
});

module.exports = router;