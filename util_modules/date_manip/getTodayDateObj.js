var getTodayDateObj = function () {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    return today;
}

module.exports = getTodayDateObj;