/**
 * Created by Myown on 2017-08-17.
 */

var server_key = "AAAAwf54n18:APA91bHn5qG5QLZ1qb1T2iQfqcGMfhAF02JSW0Lu7Nt8MxlKPdAWgq8Prw09KuhpK1jp9sQ5Jc9_XsXVbF5rFyzB9asUWrMIvsV3vlQOFA6HfBZE5MJiRulv85t19LO-aKZjJ7cB-954";
var FCM = new require('fcm-push');
var fcm = new FCM(server_key);

module.exports = fcm;