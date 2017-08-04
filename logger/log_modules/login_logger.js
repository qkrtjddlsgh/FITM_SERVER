var loginLogTemplate = require('../log_models/login_log_template');

function loginLogger(ip, url, key) {
    var newLog = new loginLogTemplate();
    newLog.ip_of_client = ip;
    newLog.req_url_of_client = url;
    newLog.access_key_of_client = key;
    newLog.save();
}

module.exports = loginLogger;