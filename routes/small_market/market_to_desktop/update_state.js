var express = require('express');
var router =  express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var name = recv_data.name;
    var new_state = recv_data.state;

    var query = {$set: {state: new_state}};

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
            smallmarket.update({name: name}, query, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    var res_data = new Object();
                    res_data.code = "9999";
                    res_data.message = "State is updated";

                    var add_data = new Object();
                    add_data.name = doc[0].name;
                    add_data.state = new_state;
                    res_data.result = add_data;

                    res.send(res_data);
                    res.end();
                }
            })
        }
    })

});

module.exports = router;