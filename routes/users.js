var express = require('express');
var router = express.Router();
var users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var member_data = new users();
    member_data.id = 'test_id';
    member_data.pw = 'test_pw';
    member_data.number = '00000';
    member_data.email = 'admin@fitm.com';

    member_data.save();
    console.log('data save success');
    res.end('data save success');
});

module.exports = router;
