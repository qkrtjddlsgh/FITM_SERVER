var express = require('express');
var router =  express.Router();
var smallmarket = require('../../../models/Smallmarket');

router.post('/', function (req, res) {

    var recv_data = req.body;

    var name = recv_data.name;

    smallmarket.find({name: name}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Item is not exist";

            res.send(res_data);
            res.end();
        }
        else{
            var new_idx = doc[0].image_list.length + 1;

            var image_url = "https://s3.ap-northeast-2.amazonaws.com/fitmbucket/"+ name + new_idx + ".png";

            console.log(image_url);

            var query = {$addToSet: {image_list: {"image": image_url}}};

            smallmarket.update({name: name}, query, function(err, result){
                if(err){
                    console.error(err.message);
                }
                else{
                    var res_data = new Object();
                    res_data.code = "9999";
                    res_data.message = "State is updated";

                    res.send(res_data);
                    res.end();
                }
            })
        }
    })

});

module.exports = router;