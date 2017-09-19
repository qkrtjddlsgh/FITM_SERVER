var express = require('express');
var router =  express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var name = recv_data.name;

    smallmarket.find({name : name}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Item is not exist";

            res.send(res_data);
            res.end();
        }
        else{
            smallmarket.remove({name: name}, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    var res_data = new Object();
                    res_data.code = "9999";
                    res_data.message = "Item is removed";

                    res.send(res_data);
                    res.end();
                }
            });
        }
    });

});

module.exports = router;