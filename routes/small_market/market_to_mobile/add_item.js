var express = require('express');
var router = express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function(req, res){
    var recv_data = req.body;

    var item = recv_data.item;
    var name = recv_data.name;
    var size = recv_data.size;

    smallmarket.find({name: item, state: 1}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Cannot purchase item";

            res.send(res_data);
            res.end();
        }
        else{
            var query = {$addToSet: {purchase_list: {"name": name, "size": size}}};

            smallmarket.update({name: item, state: 1}, query, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    var res_data = new Object();
                    res_data.code = "9999";
                    res_data.message = "Added";

                    res.send(res_data);
                    res.end();
                }
            });
        }
    })
});

module.exports = router;