var AWS = require('aws-sdk');
var backup = require('mongodb-backup');
var tar = require('tar-fs');
var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');

var rmdir = function(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};

AWS.config.update({accessKeyId: 'AKIAIRVEKU6CRPS2CNSQ',
    secretAccessKey: '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',
    region: 'ap-northeast-2'});

var s3 = new AWS.S3();

function dumpToS3() {
    console.log('dumpToS3');
    tar.pack('./backupImage/fitm_db').pipe(fs.createWriteStream('./backupImage/fitm_db_backup' + (new Date()).getTime().toString() + '.tar'));
    return new Promise(function (resolve, reject) {
        console.log('promise');
        //rmdir('./backupImage/fitm_db');
    });
}

function dbDump() {
    backup({
        uri : 'mongodb://localhost/fitm_db',
        root : './backupImage',
        callback : dumpToS3
    });
}

module.exports = dbDump;