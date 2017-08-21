var http = require('http');
var io = require('socket.io')(http);
var messageLog = require('../models/message_log');

io.on('connection', function (socket) {
    console.log(socket.id + " has connected. [" + Date.now() + "]");

    // 데이터 패킷의 기본 형태는
    // arg1 : access_key
    // arg2 : sender
    // arg3 : room_name
    // arg4 : message

    // 방 입장 이벤트 정의
    socket.on('join_room', function (data) {
        socket.join(data.access_key + '-room');
        socket.leave(socket.id); // 소켓이 생성되면, 소켓의 id 값을 가진 디폴트 룸이 생성되는데, 디폴트 룸을 나가는 명령

        messageLog.find({room_name : data.room_name}, function (err, result) {
            if(err){
                console.error(err.message);
                // DB 접속 간의 에러 발생 - 처리 코드 필요
            } else{
                if(result.length == 0){
                    /*
                    var newLog = new messageLog();
                    newLog.access_key = data.access_key;
                    newLog.room_name = data.room_name;
                    newLog.message_list = [];
                    newLog.save();
                    */
                    // document 가 없으면 에러가 발생하는 상황이다.
                } else{
                    var result_data = result[0];
                    var result_arr = result_data.message_list;
                    for(var i = 0; i < result_arr.length; i++){
                        var send_data = new Object();
                        send_data.access_key = result_arr[i].access_key;
                        send_data.sender_name = result_arr[i].sender_name;
                        send_data.room_name = result.room_name;
                        send_data.message = result_arr[i].message;
                        //socket.emit('get_room_log', send_data);
                        io.to(data.room_name).emit('get_room_log', send_data);
                    }
                }
            }
        })

    });

    // 메시지 전달 이벤트 정의
    socket.on('send_message', function (data) {
        var send_data = new Object();
        send_data.access_key = data.access_key;
        send_data.sender_name = data.sender_name;
        send_data.room_name = data.room_name;
        send_data.message = data.message;
        socket.broadcast.to(data.room_name).emit('send_message', send_data);

        messageLog.find({room_name : data.room_name}, function (err, result) {
            if(err){
                console.error(err.message);

                // DB 연결 에러 시
            }
            else{
                var query = {$push : {message_list : {access_key : data.access_key, sender : data.sender, message : data.message, idx_time : new Date().getTime()}}};
                messageLog.update({room_name : data.room_name}, query, function (err, result) {
                    if(err){
                        console.error(err.message);

                        // DB 연결 에러 시
                    }
                    else{
                        // document update 성공 시
                    }
                });
            }
        })
    });

    // 연결 종료(소켓 소멸) 이벤트 정의
    socket.on('disconnect', function (data) {
        console.log(socket.id + " has disconnected. [" + Date.now() + "]");
    });
});

module.exports = io;