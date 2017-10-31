var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var date = recv_data.date;
    var class_num = recv_data.class_num;
    var name = recv_data.name;
    var id_email = recv_data.id_email;
    var access_key = recv_data.access_key;
    var comments = recv_data.comments;

    if(!req.body.access_key || !req.body.date || !req.body.class_num || !req.body.name){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        var query = {
            $addToSet: {
                "classes.$.participant": {
                    "name": name,
                    "access_key": access_key,
                    "id_email": id_email,
                    "comments": comments
                }
            }
        };

        time_table.update({date: date, classes: {$elemMatch: {class_num: class_num}}}, query, function (err, result) {
            if (err) {
                console.error(err.message);
            }

            time_table.find({date: date}, function (err, result) {
                var chk_data = new Object();

                chk_data.count = result[0].classes[class_num - 1].participant.length;
                chk_data.max_participant = result[0].classes[class_num - 1].max_participant;

                if (err) {
                    console.error(err.message);
                }
                if (chk_data.count > chk_data.max_participant) {
                    var qquery = {
                        $pull: {
                            "classes.$.participant": {
                                "name": name,
                                "access_key": access_key,
                                "id_email" : id_email,
                                "comments": comments
                            }
                        }
                    };

                    time_table.update({
                        classes: {
                            $elemMatch: {
                                participant: {
                                    "name": name,
                                    "access_key": access_key,
                                    "id_email" : id_email,
                                    "comments": comments
                                }
                            }
                        }
                    }, qquery, function (err, result) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            var add_data = new Object();
                            add_data.message = "Full Reservation";
                            add_data.name = recv_data.name;

                            var res_data = new Object();
                            // 참가인원이 꽉차서 더 못받는 경우
                            res_data.code = "1280";
                            res_data.response = add_data;

                            res.send(res_data);
                            res.end();
                        }
                    })
                }
                else {
                    var chk_data = new Object();
                    chk_data.found = 0;

                    time_table.find({date: date}, function (err, result) {

                        for (var i = 0; i < result[0].classes.length; i++) {
                            for (var j = 0; j < result[0].classes[i].participant.length; j++) {
                                if (result[0].classes[i].participant[j].access_key == access_key) {
                                    // access_key가 들어있는 수업을 찾았을때
                                    chk_data.found++;
                                }
                            }
                        }

                        if (chk_data.found == 2) {
                            var qquery = {
                                $pull: {
                                    "classes.$.participant": {
                                        "name": name,
                                        "access_key": access_key,
                                        "id_email" : id_email,
                                        "comments": comments
                                    }
                                }
                            };

                            time_table.update({
                                classes: {
                                    $elemMatch: {
                                        participant: {
                                            "name": name,
                                            "access_key": access_key,
                                            "id_email" : id_email,
                                            "comments": comments
                                        }
                                    }
                                }
                            }, qquery, function (err, result) {
                                if (err) {
                                    console.error(err.message);
                                }
                                else {
                                    var add_data = new Object();
                                    add_data.message = "Already Reservation";
                                    add_data.name = recv_data.name;

                                    var res_data = new Object();
                                    // 이미 등록된 회원이 다시 등록하려는 경우
                                    res_data.code = "1280";
                                    res_data.response = add_data;

                                    res.send(res_data);
                                    res.end();
                                }
                            })
                        }
                        else {
                            var add_data = new Object();

                            add_data.date = recv_data.date;
                            add_data.class_num = recv_data.class_num;
                            add_data.start_time = result[0].classes[class_num - 1].start_time;
                            add_data.finish_time = result[0].classes[class_num - 1].finish_time;
                            add_data.name = recv_data.name;
                            add_data.cur_count = result[0].classes[class_num - 1].participant.length;

                            var res_data = new Object();
                            // 성공적으로 수업 등록 시
                            res_data.code = "1350";
                            res_data.response = add_data;

                            res.send(res_data);
                            res.end();
                        }
                    })
                }
            })
        });
    }
});

module.exports = router;