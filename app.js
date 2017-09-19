var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var index = require('./routes/index');
var users = require('./routes/users');
var check_certification = require('./routes/check_cron/check_certification');
var chk_email = require('./routes/check_dup_member/check_user_email');
var res_get_member_data = require('./routes/get_data_member/res_member_data'); // 등록된 회원의 세부 정보(회원 정보)의 목록을 받음
var res_get_member_ref = require('./routes/get_data_member/res_member_ref'); // 등록된 회원의 참조 정보(액세스 키)의 목록을 받음
var res_get_member_access_key_stod = require('./routes/modify_member/get_member_key/get_member_access_key');
var res_get_member_data_stod = require('./routes/modify_member/get_member_key/get_member_data');
var get_member_data_stom = require('./routes/modify_member/get_member_key/get_member_data_stom');
var udt_member_data = require('./routes/modify_member/update_member_data_stod/udt_member_data');
var udt_member_certification = require('./routes/modify_member/update_member_data_stod/udt_member_certification');
var reg_member_data = require('./routes/modify_member/register_member_data_stom/reg_member_data');
var get_member_total_data = require('./routes/modify_member/get_member_total_stod/get_member_total_stod');
var res_make_new_time_table = require('./routes/reserve_classes/res_classes_stod/res_make_document');
var res_enroll_classes_m = require('./routes/reserve_classes/res_classes_stom/res_enroll_classes_m');
var res_cancel_classes_m = require('./routes/reserve_classes/res_classes_stom/res_cancel_classes_m');
var res_check_class_by_date_m = require('./routes/reserve_classes/res_classes_stom/res_check_class_by_date_m');
var res_check_class_by_key_m = require('./routes/reserve_classes/res_classes_stom/res_check_class_by_key_m');
var res_check_classes =  require('./routes/reserve_classes/res_classes_stod/res_check_classes');
var res_change_time_of_class = require('./routes/reserve_classes/res_classes_stod/res_change_time_of_class');
var res_remove_time_table = require('./routes/reserve_classes/res_classes_stod/res_remove_document');
var res_check_calendar = require('./routes/reserve_classes/res_classes_stod/res_check_calendar');
var get_image_member = require('./routes/get_image_stod/get_image_member');
var get_image_list = require('./routes/get_image_stod/get_image_list');
var make_movement = require('./routes/reserve_classes/reg_wod_data/make_movement');
var delete_movement = require('./routes/reserve_classes/reg_wod_data/delete_movement');
var list_movement = require('./routes/reserve_classes/reg_wod_data/list_movement');
var make_wod = require('./routes/reserve_classes/reg_wod_data/make_wod');
var delete_wod = require('./routes/reserve_classes/reg_wod_data/delete_wod');
var list_wod_by_doc = require('./routes/reserve_classes/reg_wod_data/list_wod_by_doc');
var list_wod_by_name = require('./routes/reserve_classes/reg_wod_data/list_wod_by_name');
var count_up_movement = require('./routes/reserve_classes/reg_wod_data/count_up_movement');
var count_down_movement = require('./routes/reserve_classes/reg_wod_data/count_down_movement');
//var simple_push_to_m = require('./push_modules/simple_push_to_m');
var udt_device_token = require('./routes/check_dup_member/udt_device_token');
var push_to_certain_user = require('./push_modules/push_to_certain_user');
var push_to_certification_group = require('./push_modules/push_to_certification_group');
var count_reset_movement = require('./routes/reserve_classes/reg_wod_data/count_reset_movement');
var remove_recent = require('./routes/reserve_classes/reg_wod_data/remove_recent');

var push_with_device_token = require('./push_modules/push_with_device_token');
var sync_message_log = require('./chat_modules/sync_message_log'); // 170821 채팅 테스트 모듈 1 추가
var test_message_input = require('./chat_modules/test_message_input'); // 170821 채팅 테스트 모듈 2 추가
var get_room_list = require('./chat_modules/get_room_list');

var create_box_notification = require('./routes/box_notification/create_notification');
var read_box_notification = require('./routes/box_notification/read_notification');
var update_box_notification = require('./routes/box_notification/update_notification');
var delete_box_notification = require('./routes/box_notification/delete_notification');

var register_item = require('./routes/small_market/market_to_desktop/register_item');
var delete_item = require('./routes/small_market/market_to_desktop/delete_item');
var update_state = require('./routes/small_market/market_to_desktop/update_state');
var show_item = require('./routes/small_market/market_to_desktop/show_item');
var list_item = require('./routes/small_market/market_to_mobile/list_item');
var add_item = require('./routes/small_market/market_to_mobile/add_item');
var sub_item = require('./routes/small_market/market_to_mobile/sub_item');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/check_certification', check_certification);
app.use('/check_email', chk_email);
app.use('/get_member_data', res_get_member_data);
app.use('/get_member_ref', res_get_member_ref);
app.use('/get_member_access_key_stod', res_get_member_access_key_stod); // stod 의 의미는 server <-> desktop app. 이라는 의미이다.
app.use('/get_member_data_stod', res_get_member_data_stod);
app.use('/get_member_data_stom', get_member_data_stom);
app.use('/udt_member_data', udt_member_data); // members 콜렉션의 document의 특정 필드를 update
app.use('/udt_member_certification', udt_member_certification);
app.use('/register_member_data_stom', reg_member_data); // Register 과정에서 추가적인 데이터를 받음
app.use('/get_member_data_total_stod', get_member_total_data);
app.use('/res_make_new_time_table', res_make_new_time_table);
app.use('/res_enroll_classes_m', res_enroll_classes_m);
app.use('/res_cancel_classes_m', res_cancel_classes_m);
app.use('/res_check_class_by_date_m', res_check_class_by_date_m);
app.use('/res_check_class_by_key_m', res_check_class_by_key_m);
app.use('/res_check_classes', res_check_classes);
app.use('/res_change_time_of_class', res_change_time_of_class);
app.use('/res_remove_document', res_remove_time_table);
app.use('/res_check_calendar', res_check_calendar);
app.use('/get_image_member', get_image_member);
app.use('/get_image_list', get_image_list);
app.use('/make_movement', make_movement);
app.use('/delete_movement', delete_movement);
app.use('/list_movement', list_movement);
app.use('/make_wod', make_wod);
app.use('/delete_wod', delete_wod);
app.use('/list_wod_by_doc', list_wod_by_doc);
app.use('/list_wod_by_name', list_wod_by_name);
app.use('/count_up_movement', count_up_movement);
app.use('/count_down_movement', count_down_movement);
//app.use('/simple_push_to_m', simple_push_to_m);
app.use('/udt_device_token', udt_device_token);
app.use('/push_to_certain_user', push_to_certain_user);
app.use('/push_to_certification_group', push_to_certification_group);
app.use('/count_reset_movement', count_reset_movement);
app.use('/remove_recent', remove_recent);
app.use('/push_with_device_token', push_with_device_token);
app.use('/sync_message_log', sync_message_log); // 170821 채팅 테스트 모듈 1 추가
app.use('/test_message_input', test_message_input); // 170821 채팅 테스트 모듈 2 추가
app.use('/get_room_list', get_room_list);

app.use('/create_notification', create_box_notification);
app.use('/read_notification', read_box_notification);
app.use('/update_notification', update_box_notification);
app.use('/delete_notification', delete_box_notification);

app.use('/register_item', register_item);
app.use('/delete_item', delete_item);
app.use('/update_state', update_state);
app.use('/show_item', show_item);
app.use('/list_item', list_item);
app.use('/add_item', add_item);
app.use('/sub_item', sub_item);

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
