var cron = require('node-cron');
var express = require('express');
var router = express.Router();

var today = require('../../util_modules/date_manip/getToday');
var member = require('../../models/Member');

// 매일 AM 12:00 마다 실행 됨
cron.schedule('0 2 * * *', function () {
    console.log('info', 'running a task every day / ' + new Date());

    //console.log(today(new Date());

    member.find({certification: 2}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<doc.length; i++) {
                if(doc[i].finish_date < today(new Date())){
                    // 회원기간만료이므로 certification 1로 수정
                    var query = {$set: {certification : 1}};

                    member.update({certification : 2}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                    });

                }
            }
        }
    });

    member.find({doc_type: "remain_list"}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            for(var i=0; i<doc[0].remain_list.length; i++){
                if(doc[0].remain_list[i].state != 0 && doc[0].remain_list[i].state < today(new Date())){
                    var query = {$set: {certification : 2}};

                    member.update({access_key: doc[0].remain_list[i].access_key}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                    });
                }
                else
                    continue;
            }
        }

        member.find({})
    })

}).start();

module.exports = router;