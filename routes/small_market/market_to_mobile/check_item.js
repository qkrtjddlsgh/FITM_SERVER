var express = require('express');
var router =  express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var name = recv_data.name;
    var id_email = recv_data.id_email;
    var purchase_state = 0;

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
            var send_data = new Object();
            send_data.code = "9999";

            for(var i=0; i<doc.length; i++){
                var temp = new Object();
                temp.name = doc[0].name;
                temp.num_of_purchase = doc[0].purchase_list.length;

                for(var j=0; j<doc[0].purchase_list.length; j++){
                    if(doc[i].purchase_list[j].id_email == id_email){
                        purchase_state = 1;
                    }
                }

                temp.purchase_state = purchase_state;
                purchase_state = 0;
            }

            send_data.response = temp;

            res.send(send_data);
            res.end();
        }
    })

});

module.exports = router;