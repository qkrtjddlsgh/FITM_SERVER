/**
 * Created by Myown on 2017-10-13.
 */
var express = require('express');
var router = express.Router();
var transaction = require('../../models/transactionLog');

router.post('/create', function (req, res) {
    var name = req.body.name;
    var date_year = req.body.date_year;
    var date_month = req.body.date_month;
    date_month -= 1;
    var date_day = req.body.date_day;
    var transaction_tag = req.body.transaction_tag;
    var item_name = req.body.item_name;
    var amount = req.body.amount;
    var payment_type = req.body.payment_type;
    var date_obj = new Date(date_year, date_month, date_day, 0, 0, 0, 0);
    date_obj.setHours(date_obj.getHours() + 9);
    var date = date_obj.getTime();

    var id_email = req.body.id_email;
    var phone_number = req.body.phone_number;

    var newDoc = new transaction();
    newDoc.name = name;
    newDoc.id_email = id_email;
    newDoc.phone_number = phone_number;
    newDoc.date_year = date_year;
    newDoc.date_month = date_month;
    newDoc.date_month += 1;
    newDoc.date_day = date_day;
    newDoc.transaction_tag = transaction_tag;
    newDoc.item_name = item_name;
    newDoc.amount = amount;
    newDoc.payment_type = payment_type;
    newDoc.date_idx = date;

    newDoc.save(function (err, result) {
        if(err){
            console.error(err);
            var sendObj = new Object();
            sendObj.code = '5800';
            sendObj.response = { message : 'database error' };
            res.send(sendObj);
            res.end();
        }else{
            var sendObj = new Object();
            sendObj.code = '2789';
            sendObj.response = { message : result };
            res.send(sendObj);
            res.end();
        }
    });

});

module.exports = router;