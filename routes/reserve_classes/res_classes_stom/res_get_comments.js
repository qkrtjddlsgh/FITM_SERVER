var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var date = recv_data.date;

    time_table.find({date: date}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "해당 날짜에 수업이 없습니다.";

            res.send(res_data);
            res.end();
        }
        else{
            var add_data = new Array();

            for(var i=0; i<doc[0].classes.length; i++){
                for(var j=0; j<doc[0].classes[i].participant.length; j++){
                    var temp = new Object();
                    temp.id_email = doc[0].classes[i].participant[j].id_email;
                    temp.name = doc[0].classes[i].participant[j].name;
                    temp.comments = doc[0].classes[i].participant[j].comments;
                    add_data.push(temp);
                }
            }

            var res_data = new Object();
            res_data.code = "9999";
            res_data.count = add_data.length;
            res_data.response = add_data;

            res.send(res_data);
            res.end();
        }
    })
});

module.exports = router;