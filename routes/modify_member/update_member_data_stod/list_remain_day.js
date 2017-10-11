var express = require('express');
var router = express.Router();
var remains = require('../../../models/Member');

router.post('/', function(req, res){

    remains.find({doc_type: "remain_list"}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No data";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.code = "9999";

            var add_data = new Array();

            for(var i=0; i<doc[0].remain_list.length; i++){
                if(doc[0].remain_list[i].state != 0){
                    continue;
                }
                else{
                    add_data.push(doc[0].remain_list[i]);
                }
            }

            res_data.result = add_data;
            res.send(res_data);
            res.end();
        }
    });
});

module.exports = router;