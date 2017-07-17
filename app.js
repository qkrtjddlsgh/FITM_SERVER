var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

/*
// redis test
var redis = require('redis');
var JSON = require('JSON');
client = redis.createClient(6379,'127.0.0.1');

app.use(function(req,res,next){
    req.cache = client;
    next();
})

app.post('/profile',function(req,res,next){
    req.accepts('application/json');

    var key = req.body.name;
    var value = JSON.stringify(req.body);

    req.cache.set(key,value,function(err,data){
        if(err){
            console.log(err);
            res.send("error "+err);
            return;
        }
        req.cache.expire(key,10);
        res.json(value);
        //console.log(value);
    });
})

app.get('/profile/:name',function(req,res,next){
    var key = req.params.name;

    req.cache.get(key,function(err,data){
        if(err){
            console.log(err);
            res.send("error "+err);
            return;
        }

        var value = JSON.parse(data);
        res.json(value);
    });
});
*/

var index = require('./routes/index');
var users = require('./routes/users');
var register_new_member = require('./routes/check_dup_member/register_new_member');
var chk_email = require('./routes/check_dup_member/check_user_email');
var res_get_member_data = require('./routes/get_data_member/res_member_data'); // 등록된 회원의 세부 정보(회원 정보)의 목록을 받음
var res_get_member_ref = require('./routes/get_data_member/res_member_ref'); // 등록된 회원의 참조 정보(액세스 키)의 목록을 받음
var res_get_member_access_key_stod = require('./routes/modify_member/get_member_key/get_member_access_key');
var res_get_member_data_stod = require('./routes/modify_member/get_member_key/get_member_data');
var udt_member_data = require('./routes/modify_member/update_member_data/udt_member_data');


// mongodb connection
var mongoose = require('mongoose');

// CONNECT TO MONGODB SERVER
// 여기선 딱히 건드릴 부분이 없음
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/fitm_db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register_new_member', register_new_member);
app.use('/check_email', chk_email);
app.use('/get_member_data', res_get_member_data);
app.use('/get_member_ref', res_get_member_ref);
app.use('/get_member_access_key_stod', res_get_member_access_key_stod); // stod 의 의미는 server <-> desktop app. 이라는 의미이다.
app.use('/get_member_data_stod', res_get_member_data_stod);
app.use('/udt_member_data', udt_member_data); // members 콜렉션의 document의 특정 필드를 update

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
