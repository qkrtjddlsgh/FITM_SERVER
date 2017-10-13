var express = require('express');
var router = express.Router();
var remains = require('../../../models/Remain_List');

router.post('/', function(req, res){

    remains.find().sort({state: -1}).exec(function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            var res_data = new Object();
            res_data.code = "9999";
            res_data.result = doc;

            res.send(res_data);
            res.end();
        }
    })
});

module.exports = router;