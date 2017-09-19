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
        else{
            var send_data = new Object();
            send_data.code = "9999";

            var add_data = new Object();
            add_data.result = doc;

            send_data.response = add_data;

            res.send(send_data);
            res.end();
        }
    })

});

module.exports = router;