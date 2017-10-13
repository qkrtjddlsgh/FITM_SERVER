var express = require('express');
var router = express.Router();
var remains = require('../../../models/Remain_List');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id_email = recv_data.id_email;

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
       else {
           remains.remove({id_email: id_email, state: 0}, function (err, result) {
               if(err){
                   console.error(err.message);
               }
               else {
                   var res_data = new Object();
                   res_data.code = "9999";
                   res_data.message = "휴회신청이 취소되었습니다.";

                   res.send(res_data);
                   res.end();
               }
           });
       }
    });
});

module.exports = router;
