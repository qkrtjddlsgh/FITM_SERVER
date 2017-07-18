var express = require('express');
var router = express.Router();
var today = require('../utils/date_manip/getToday');
var obj = require('../utils/date_manip/getTodayObj');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(today);
    res.end('data save success');
    var today_obj = obj;
    console.log(today_obj.year + today_obj.month + today_obj.date);
});

module.exports = router;
