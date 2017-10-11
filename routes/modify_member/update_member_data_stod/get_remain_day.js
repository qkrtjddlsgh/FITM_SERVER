var express = require('express');
var router = express.Router();
var remains = require('../../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    var access_key = recv_data.access_key;
    var check = 1;

    remains.find({doc_type: "remain_list"}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<doc[0].remain_list.length; i++){
                if(doc[0].remain_list[i].access_key == access_key){
                    check = 0;
                    var res_data = new Object();
                    res_data.code = "9999";

                    var add_data = new Object();
                    add_data.access_key = doc[0].remain_list[i].access_key;
                    add_data.state = doc[0].remain_list[i].state;

                    res_data.result = add_data;

                    res.send(res_data);
                    res.end();
                }
            }

            if(check == 1) {
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "Not in remain_list";

                res.send(res_data);
                res.end();
            }
        }
    })
});

module.exports = router;