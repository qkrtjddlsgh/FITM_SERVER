var express = require('express');
var router =  express.Router();
var today = require('../../../util_modules/date_manip/getToday');
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var name = recv_data.name;
    var price = recv_data.price;
    var content = recv_data.content;
    var num_of_item = recv_data.num_of_item;

    smallmarket.find({name : name}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var new_item = new smallmarket();
            new_item.date = today;
            new_item.state = 1;
            new_item.name = name;
            new_item.price = price;
            new_item.content = content;
            new_item.num_of_item = num_of_item;
            new_item.purchase_list = [];
            new_item.save();

            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "Item is registered";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Item is already exist";

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;