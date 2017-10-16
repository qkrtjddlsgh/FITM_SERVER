var express = require('express');
var router = express.Router();
var member = require('../../models/Member');
var message_log  = require('../../models/message_log');
var smallmarket = require('../../models/Smallmarket');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id_email = recv_data.id_email;

    member.find({id_email: id_email}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Id_email is not exist";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();

            member.remove({id_email: doc[0].id_email}, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    res_data.code = "9999";
                }
            })
            message_log.remove({room_name: doc[0].id_email}, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{

                }
            });

            smallmarket.find().sort("submitted").exec(function(err, doc){
                if(err){
                    console.error(err.message);
                }
                else{
                    for(var i=0; i<doc.length; i++){
                        var query3 = {$pull: {purchase_list: {"id_email": id_email}}};

                        smallmarket.update({name: doc[i].name}, query3, function(err, result){
                            if(err){
                                console.error(err.message);
                            }
                            else{
                                res_data.message = "Id_email and Message_log and Smallmarket are removed";

                                res.send(res_data);
                                res.end();
                            }
                        });
                    }
                }
            });
        }
    })
});

module.exports = router;