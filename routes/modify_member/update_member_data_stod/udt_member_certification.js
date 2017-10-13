var express = require('express');
var router = express.Router();
var remains = require('../../../models/Remain_List');
var members = require('../../../models/Member');

router.post('/', function(req, res) {
    var recv_data = req.body;

    var id_email = recv_data.id_email;
    var new_state = recv_data.state;
    var new_message = recv_data.message;
    // state 0 : 미확인 state 1 : 수락 state 2 : 거절 state 3 : 옛날것

    remains.find({id_email: id_email, state: 0}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "id_email이 존재하지 않습니다.";

            res.send(res_data);
            res.end();
        }
        else{
            var query = {$set: {state: new_state, message: new_message}};

            remains.update({id_email: id_email, state: 0}, query, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else if(result.ok){
                    if(new_state == 1) {
                        var res_data = new Object();
                        res_data.code = "9999";
                        res_data.message = "정상적으로 승인되었습니다.";

                        res.send(res_data);
                        res.end();
                    }
                    else if(new_state == 2) {
                        var res_data = new Object();
                        res_data.code = "9999";
                        res_data.message = "정상적으로 거절되었습니다.";

                        res.send(res_data);
                        res.end();
                    }
                }
            });
        }
    });
});

module.exports = router;