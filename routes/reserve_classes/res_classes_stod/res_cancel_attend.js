var express = require('express');
var router = express.Router();
var time_table = require('../../../models/Time_Table');

router.post('/', function(req, res){
    var recv_data = req.body;

    var date = recv_data.date;
    var access_key = recv_data.access_key;

    time_table.find({date: date}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            // date에 해당되는 수업이 없을때
            var send_data = new Object();
            send_data.code = "4170";

            var add_data = new Object();
            add_data.message = "not classes in this date!!";
            send_data.response = add_data;

            res.send(send_data);
            res.end();
        }
        else{
            for (var i = 0; i < doc[0].classes.length; i++) {
                for (var j = 0; j < doc[0].classes[i].participant.length; j++) {
                    if (doc[0].classes[i].participant[j].access_key == access_key) {
                        // access_key가 들어있는 수업을 찾았을때

                        var qquery = {$set: {"classes.$.participant": {"attend": 0}}};

                        time_table.update({classes: {$elemMatch: {participant: {"access_key": access_key}}}}, qquery, function (err, result) {
                            if (err) {
                                console.error(err.message);
                            }
                            else {
                                var add_data = new Object();
                                add_data.code = "9999";
                                add_data.message = "attend complete";

                                var res_data = new Object();
                                res_data.response = add_data;

                                res.send(res_data);
                                res.end();
                            }
                        })
                    }
                }
            }
        }
    });
});

module.exports = router;