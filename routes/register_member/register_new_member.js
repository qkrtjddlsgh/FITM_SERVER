/**
 * Created by Myown on 2017-07-10.
 */
var express = require('express');
var router = express.Router();
var users = require('../../models/user');

router.post('/', function(req, res){
    console.log('request arrived for register new member.');
    var recv_data = req.body;
    var member_data = new users();

    member_data.name = recv_data.name;
    member_data.number = recv_data.number;
    member_data.email = recv_data.email;

    member_data.save();
    res.end('register success');
});

module.exports = router;