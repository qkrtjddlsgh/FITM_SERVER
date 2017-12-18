var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var date = recv_data.date;
    var access_key = recv_data.access_key;

    if(!req.body.access_key || !req.body.date){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        var chk_data = new Object();
        chk_data.found = 0;

        time_table.find({date: date}, function (err, result) {

            for (var i = 0; i < result[0].classes.length; i++) {
                for (var j = 0; j < result[0].classes[i].participant.length; j++) {
                    if (result[0].classes[i].participant[j].access_key == access_key) {
                        // access_key가 들어있는 수업을 찾았을때
                        chk_data.found = 1;

                        console.log('ACCESS_KEY : ' + JSON.stringify(req.body));
                        console.log('COMMENT : ' + JSON.stringify(result[0].classes[i].participant[j]));

                        var name = result[0].classes[i].participant[j].name;
                        var id_email = result[0].classes[i].participant[j].id_email;
                        var comments = result[0].classes[i].participant[j].comments;
                        var attend = result[0].classes[i].participant[j].attend;
                        var user_gender = result[0].classes[i].participant[j].user_gender;

                        var add_data = new Object();

                        add_data.message = "Canceled Class";
                        add_data.date = result[0].date;
                        add_data.class_num = result[0].classes[i].class_num;
                        add_data.access_key = result[0].classes[i].participant[j].access_key;

                        var query = {
                            $pull: {
                                "classes.$.participant": {
                                    "name": name,
                                    "access_key": access_key,
                                    "id_email": id_email,
                                    "comments": comments,
                                    "attend": attend,
                                    "user_gender": user_gender
                                }
                            }
                        };
                        
                        time_table.find({
                            'classes.participant' : {
                                $elemMatch : {
                                    "access_key": access_key
                                }
                            }
                        },function (err, result) {
                            if(err){
                                console.error(err);
                            }else{
                                console.log('COMMENT_FIND : ' + JSON.stringify(result));
                            }
                        });

                        time_table.update({
                            classes: {
                                $elemMatch: {
                                    participant: {
                                        "name": name,
                                        "access_key": access_key,
                                        "id_email": id_email,
                                        "comments": comments,
                                        "attend": attend,
                                        "user_gender": user_gender
                                    }
                                }
                            }
                        }, query, function (err, result) {
                            if (err) {
                                console.error(err.message);
                            }else{
                                console.log('CANCEL CLASS : ' + JSON.stringify(result));
                            }
                        });

                        var res_data = new Object();
                        // 성공적으로 수업 삭제 시
                        res_data.code = "1270";
                        res_data.response = add_data;

                        res.send(res_data);
                        res.end();
                    }
                }
            }

            if (chk_data.found == 0) {
                var add_data = new Object();
                add_data.message = "Not enrolled";

                var res_data = new Object();
                res_data.code = "2170";
                res_data.response = add_data;

                res.send(res_data);
                res.end();
            }
        });
    }
});

module.exports = router;