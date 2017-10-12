var cron = require('node-cron');
var express = require('express');
var router = express.Router();

var today = require('../../util_modules/date_manip/getToday');
var member = require('../../models/Member');

// 매일 AM 12:00 마다 실행 됨
cron.schedule('0 9 * * *', function () {
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
                // today가 12시넘어도 안바뀜.
                if(doc[0].remain_list[i].state == 1 && doc[0].remain_list[i].end_date < today(new Date())){
                    // 휴회기간이 끝났을때
                    var query = {$set: {certification : 2, finish_date: today(new Date())}};

                    member.update({access_key: doc[0].remain_list[i].access_key}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                    });
                    break;
                }
                if(doc[0].remain_list[i].state == 1 && doc[0].remain_list[i].start_date == today(new Date())){
                    // 휴회기간이 시작될때
                    var query = {$set: {certification: 1}};

                    member.update({access_key: doc[0].remain_list[i].access_key}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                    });
                    break;
                }
                else
                    continue;
            }
        }
    });

}).start();

module.exports = router;