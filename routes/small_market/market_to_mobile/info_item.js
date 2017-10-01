var express = require('express');
var router =  express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var name = recv_data.name;

    smallmarket.find({name: name}, function(err, doc){
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
            var add_data = new Object();
            add_data.in_content = doc[0].in_content;
            add_data.image_list = doc[0].image_list;
            add_data.price = doc[0].price;
            add_data.remain_item = doc[0].num_of_item - doc[0].purchase_list.length;

            var send_data = new Object();
            send_data.code = "9999";
            send_data.response = add_data;

            res.send(send_data);
            res.end();
        }
    })

});

module.exports = router;