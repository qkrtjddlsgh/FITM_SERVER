var express = require('express');
var router = express.Router();
var today = require('../../../util_modules/date_manip/getToday');
var members = require('../../../models/Member');

router.post('/', function(req, res){

    var recv_data = req.body;

    var date = recv_data.date;
    var access_key = recv_data.access_key;
    var check = 100;

    members.find({doc_type: "remain_list"}, function(err, result){
        if (err) {
            console.error(err.message);
        }
        if (result.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No data";

            res.send(res_data);
            res.end();
        }
        else {
            for (var i = 0; i < result[0].remain_list.length; i++){
                if (result[0].remain_list[i].state == 0 && result[0].remain_list[i].access_key == access_key && result[0].remain_list[i].date == date){

                    var query = {$pull: {remain_list: {"access_key": access_key}}};

                    members.update({doc_type: "remain_list"}, query, function (err, doc) {
                        if (err) {
                            console.error(err.message);
                        }
                    });

                    check = 0;
                    break;
                }
                if(result[0].remain_list[i].state == 1 && result[0].remain_list[i].access_key == access_key && result[0].remain_list[i].date == date){
                    check = 1;
                    break;
                }
                if(result[0].remain_list[i].state == 2 && result[0].remain_list[i].access_key == access_key && result[0].remain_list[i].date == date){
                    check = 2;
                    break;
                }
            }

            if(check == 0){
                var res_data = new Object();
                res_data.code = "9999";
                res_data.message = "Canceled";

                res.send(res_data);
                res.end();
            }
            else if(check == 1){
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "이미 승인되었습니다.";

                res.send(res_data);
                res.end();
            }
            else if(check == 2){
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "이미 거절되었습니다.";

                res.send(res_data);
                res.end();
            }
            else{
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "No data";

                res.send(res_data);
                res.end();
            }
        }
    });
});

module.exports = router;
