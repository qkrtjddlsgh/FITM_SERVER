var express = require('express');
var router = express.Router();
var today = require('../../util_modules/date_manip/getToday');
var member = require('../../models/Member');
var message_log  = require('../../models/message_log');
var smallmarket = require('../../models/Smallmarket');
var remain = require('../../models/Remain_List');
var time_table = require('../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id_email = recv_data.id_email;

    member.find({id_email: id_email, doc_type: "member_data"}, function(err, doc){
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

            message_log.remove({room_name: doc[0].id_email}, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    res_data.code = "9999";
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

                            }
                        });
                    }
                }
            });

            remain.remove({id_email: id_email}, function(err, doc){
                if(err){
                    console.error(err.message);
                }
                else{
                    res_data.message = "Id_email and Message_log and Smallmarket and Remain_List are removed";
                }
            });

            var query4 = {$pull: {"classes.$.participant":{"access_key": doc[0].access_key, "name": doc[0].name, "id_email": id_email}}};

            time_table.update({date: today(new Date()), classes: {$elemMatch: {participant: {"name": doc[0].name, "access_key": doc[0].access_key, "id_email": id_email}}}}, query4, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    res.send(res_data);
                    res.end();
                }
            });

            member.remove({id_email: doc[0].id_email}, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{

                }
            })
        }
    })
});

module.exports = router;