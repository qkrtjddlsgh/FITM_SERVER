var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){

    var arr = new Array();

    members.find({doc_type: "member_data"}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";

            res.send(res_data);
            res.end();
        }
        else{
            for(var i=0; i<doc.length; i++){
                if(doc[i].locker_num == 0)
                    continue;
                else{
                    var add_data = new Object();
                    add_data.name = doc[i].name;
                    add_data.locker_num = doc[i].locker_num;
                    add_data.locker_start = doc[i].locker_start;
                    add_data.locker_finish = doc[i].locker_finish;

                    arr.push(add_data);

                }
            }

            var res_data = new Object();
            res_data.code = "9999";
            res_data.result = arr;

            res.send(res_data);
            res.end();
        }
    })
});

module.exports = router;