/**
 * Created by Myown on 2017-07-16.
 */
var express = require('express');
var router = express.Router();
var chk = require('../../models/CheckEmail');

router.post('/', function(req, res){

    chk.find({doc_type : "member_ref"}).then(function (doc) {
        res.send(doc);
        res.end();
    }).catch(function (err) {
        console.error(err.message);
        res.end("error occured.");
    });

});

module.exports = router;