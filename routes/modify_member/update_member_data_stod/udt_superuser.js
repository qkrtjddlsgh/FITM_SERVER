var express = require('express');
var router = express.Router();
var members = require('../../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id_email = recv_data.id_email;

    members.find({id_email: id_email, doc_type: "member_data"}, function(err, doc){
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
            var query = {$set:{certification: 3}};

            members.update({id_email: id_email, doc_type: "member_data"}, query, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    var res_data = new Object();
                    res_data.code = "9999";
                    res_data.message = "정상적으로 업데이트 됬습니다.";

                    res.send(res_data);
                    res.end();
                }
            })
        }
    });
});

module.exports = router;