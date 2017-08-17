/**
 * Created by Myown on 2017-08-17.
 */

var server_key = "AAAAwf54n18:APA91bEDhsIEYnN3PUVR8DAxS-C6AN9K2xZYqlxVntRSiw65hYEYHubvLVfAk6oR0892CAuljAHv-3pkMaBVaJsqP5jjaJbmEGwoR9PVZxYy3BebkgbzEsb3ZUPvx8vrBp3kxC2oO4uj";
var FCM = new require('fcm-push');
var fcm = new FCM(server_key);

module.exports = fcm;