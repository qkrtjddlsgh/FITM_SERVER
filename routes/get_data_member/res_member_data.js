/**
 * Created by Myown on 2017-07-10.
 */

var express = require('express');
var router = express.Router();
var member = require('../../models/Member');

router.post('/', function(req, res){

    member.find({doc_type : "member_data"}).then(function (doc) {
        res.send(doc);
        res.end();
    }).catch(function (err) {
        console.error(err.message);
        res.end("error occured.");
    });

});

module.exports = router;