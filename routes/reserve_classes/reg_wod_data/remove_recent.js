var express = require('express');
var router =  express.Router();
var wod_list = require('../../../models/Wod_List');
var movement = require('../../../models/Movement');

router.post('/', function (req, res) {
    wod_list.find({doc_type: "recent"}).sort("submitted").exec(function (err, doc){
        if (err){
            console.error(err.message);
        }
        else {
            var temp = new Array();
            var count = doc.length;

            // 현재는 test, 원래는 30
            if(count > 5){
                for(var i=0; i<doc[0].num_of_movements; i++){
                    temp.push(doc[0].movement_list[i]);
                    /*movement.find({movement_name: doc[0].movement_list[i]}, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                        else {
                            var new_count = result[0].movement_count - 1;
                            var query = {$set: {movement_count: new_count}};

                            console.log(new_count);

                            movement.update({movement_name: doc[0].movement_list[i]}, query, function (err, result) {
                                if (err) {
                                    console.error(err.message);
                                }
                                console.log(result);
                            });
                        }
                    });*/
                }

                wod_list.remove({wod_name: doc[0].wod_name}, function(err, result){
                    if (err) {
                        console.error(err.message);
                    }
                    else{
                        var send_data = new Object();
                        send_data.code = "9999";

                        var add_data = new Object();
                        add_data.movement_list = temp;
                        add_data.message = "Removed Successfully!";

                        send_data.response = add_data;

                        res.send(send_data);
                        res.end();
                    }
                });
            }
            else{
                var send_data = new Object();
                send_data.code = "8888";

                var add_data = new Object();
                add_data.message = "Not yet!!";

                send_data.response = add_data;

                res.send(send_data);
                res.end();
            }
        }
    });
});

module.exports = router;