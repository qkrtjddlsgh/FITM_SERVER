/**
 * Created by Myown on 2017-08-17.
 */

var server_key = "AIzaSyAss8NbpgArHhMcrKDZ5fz3twK64Tm07HY";
var FCM = new require('fcm-push');
var fcm = new FCM(server_key);

module.exports = fcm;