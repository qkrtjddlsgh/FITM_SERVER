var express = require('express');
var router = express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function(req, res){
    var recv_data = req.body;

    var item = recv_data.item;
    var id_email = recv_data.id_email;
    var size = recv_data.size;

    smallmarket.find({name: item, state: 1}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Cannot canceled item";

            res.send(res_data);
            res.end();
        }
        else{
            var query = {$pull: {purchase_list: {"id_email": id_email, "size": size}}};

            smallmarket.update({name: item, state: 1}, query, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    if(result.nModified == 0){
                        var res_data = new Object();
                        res_data.code = "7777";
                        res_data.message = "Already not exist";

                        res.send(res_data);
                        res.end();
                    }
                    else{
                        var res_data = new Object();
                        res_data.code = "9999";
                        res_data.message = "Removed";

                        res.send(res_data);
                        res.end();
                    }
                }
            });
        }
    })
});

module.exports = router;