var express = require('express');
var router =  express.Router();
var wod_list = require('../../../models/Wod_List');

router.post('/', function (req, res) {
    var recv_data = req.body;

    var doc_type = recv_data.doc_type;

    if(!req.body.doc_type){
        var send_data = new Object();
        send_data.code = "5000";
        send_data.message = "Incorrect Request";

        res.send(send_data);
        res.end();
    }
    else {
        wod_list.find({doc_type: doc_type}).sort("submitted").exec(function (err, doc) {
            if (err) {
                console.error(err.message);
            }
            else {
                var send_data = new Object();
                send_data.code = "9999";

                var add_data = new Object();
                add_data.result = doc;

                send_data.response = add_data;

                res.send(send_data);
                res.end();
            }
        });
    }
});

module.exports = router;