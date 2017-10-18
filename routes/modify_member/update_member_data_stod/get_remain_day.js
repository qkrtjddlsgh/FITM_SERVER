var express = require('express');
var router = express.Router();
var remains = require('../../../models/Remain_List');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id_email = recv_data.id_email;
    var check = 0;

    remains.find({id_email: id_email}, function(err, doc){
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
            for(var i=0; i<doc.length; i++){
                if(doc[i].state == 3 || doc[i].state == 4){
                    continue;
                }
                if(doc[i].state == 0){
                    check = 1;
                    var res_data = new Object();
                    var add_data = new Object();

                    res_data.code = "9999";
                    add_data.id_email = doc[i].id_email;
                    add_data.name = doc[i].name;
                    add_data.state = doc[i].state;
                    add_data.start_date = doc[i].start_date.substr(0, 4) + "/" + doc[i].start_date.substr(4, 2) + "/" + doc[i].start_date.substr(6, 2);
                    add_data.end_date = doc[i].end_date.substr(0, 4) + "/" + doc[i].end_date.substr(4, 2) + "/" + doc[i].end_date.substr(6, 2);
                    add_data.comments = doc[i].comments;
                    add_data.message = doc[i].message;

                    res_data.result = add_data;
                    res.send(res_data);
                    res.end();
                }
                else if(doc[i].state == 1){
                    check = 1;
                    var res_data = new Object();
                    var add_data = new Object();

                    res_data.code = "9999";
                    add_data.id_email = doc[i].id_email;
                    add_data.name = doc[i].name;
                    add_data.state = doc[i].state;
                    add_data.start_date = doc[i].start_date.substr(0, 4) + "/" + doc[i].start_date.substr(4, 2) + "/" + doc[i].start_date.substr(6, 2);
                    add_data.end_date = doc[i].end_date.substr(0, 4) + "/" + doc[i].end_date.substr(4, 2) + "/" + doc[i].end_date.substr(6, 2);
                    add_data.comments = doc[i].comments;
                    add_data.message = doc[i].message;

                    res_data.result = add_data;
                    res.send(res_data);
                    res.end();
                }
                else if(doc[i].state == 2){
                    check = 1;
                    var res_data = new Object();
                    var add_data = new Object();

                    res_data.code = "9999";
                    add_data.id_email = doc[i].id_email;
                    add_data.name = doc[i].name;
                    add_data.state = doc[i].state;
                    add_data.start_date = doc[i].start_date.substr(0, 4) + "/" + doc[i].start_date.substr(4, 2) + "/" + doc[i].start_date.substr(6, 2);
                    add_data.end_date = doc[i].end_date.substr(0, 4) + "/" + doc[i].end_date.substr(4, 2) + "/" + doc[i].end_date.substr(6, 2);
                    add_data.comments = doc[i].comments;
                    add_data.message = doc[i].message;

                    res_data.result = add_data;
                    res.send(res_data);
                    res.end();
                }
            }

            if(check == 0) {
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "신청 목록이 존재하지 않습니다";

                res.send(res_data);
                res.end();
            }
        }
    });
});

module.exports = router;