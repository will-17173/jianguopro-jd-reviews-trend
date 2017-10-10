function isLeapYear(year) {
	return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

function getMonthDays(year, month) {
	return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

function getWeekNumber(y, m, d) {
 var now = new Date(y, m - 1, d),
year = now.getFullYear(),
month = now.getMonth(),
days = now.getDate();
//那一天是那一年中的第多少天
for (var i = 0; i < month; i++) {
days += getMonthDays(year, i);
}
 
//那一年第一天是星期几
var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

var week = null;
if (yearFirstDay == 1) {
week = Math.ceil(days / yearFirstDay);
} else {
days -= (7 - yearFirstDay + 1);
week = Math.ceil(days / 7) + 1;
}

 return week;
}

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = getWeekNumber;
}

// module.exports = getWeekNumber;