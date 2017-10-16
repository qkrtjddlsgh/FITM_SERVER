/**
 * Created by Myown on 2017-10-13.
 */
var express = require('express');
var router = express.Router();
var transaction = require('../../models/transactionLog');

router.post('/read', function (req, res) {
    var date_year_from = req.body.date_year_from;
    var date_month_from = req.body.date_month_from;
    date_month_from -= 1;
    var date_day_from = req.body.date_day_from;

    var date_year_to = req.body.date_year_to;
    var date_month_to = req.body.date_month_to;
    date_month_to -= 1;
    var date_day_to = req.body.date_day_to;

    var date_from_obj = new Date(date_year_from, date_month_from, date_day_from, 0, 0, 0, 0);
    date_from_obj.setHours(date_from_obj.getHours() + 9);
    var date_to_obj = new Date(date_year_to, date_month_to, date_day_to, 0, 0, 0, 0);
    date_to_obj.setHours(date_to_obj.getHours() + 9);
    var date_from = date_from_obj.getTime();
    var date_to = date_to_obj.getTime();
    date_to += 100;

    transaction.find({date : { $gte : date_from, $lte : date_to }}, function (err, result) {
        if(err){
            console.error(err);
            var sendObj = new Object();
            sendObj.code = '5800';
            sendObj.response = { message : 'database error' };
            res.send(sendObj);
            res.end();
        }else{
            if(result.length == 0){
                var sendObj = new Object();
                sendObj.code = '4789';
                sendObj.response = { message : 'no data' };
                res.send(sendObj);
                res.end();
            }else{
                var sendObj = new Object();
                sendObj.code = '1789';
                sendObj.response = { list : result };
                res.send(sendObj);
                res.end();
            }
        }
    });
});

module.exports = router;