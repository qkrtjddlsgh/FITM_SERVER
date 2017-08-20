var cron = require('node-cron');
var express = require('express');
var router = express.Router();
//var member = require('../models/Member');

// 매일 AM 12:00 마다 실행 됨
cron.schedule('0 0 0 * * *', function () {
    console.log('info', 'running a task every day / ' + new Date());

    /*member.find({certification: 2}, function(err, result){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<result.length; i++){
                console.log(result[i].name);
            }
        }
    });*/

}).start();

module.exports = router;