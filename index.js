var https = require('https');
var url = 'https://item.m.jd.com/ware/getDetailCommentList.json?wareId=3867555';
var fs = require('fs');
var path = require('path');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
var hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
var min = 0;
// var sec = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
rule.hour = hours;
rule.minute = min;
// rule.second = sec;

var db = {};

fs.readFile(__dirname + '/db.js', {flag: 'r+'}, function(err, res){
	if(err){
		console.log(err);
		return;
	}

	db = JSON.parse(res.toString())
})

var getWeekNumber = require('./week');

var year = new Date().getFullYear(),
	month = new Date().getMonth() + 1,
	date = new Date().getDate(),
	day = new Date().getDay() ? (new Date().getDay() - 1) : 6,
	
	weekNumber = '' + year + getWeekNumber(year, month, date);

function getCount(){
	https.get(url, function(res){
		var bufs = [];
		res.on('data', function(data){
			bufs.push(data);
		})
		res.on('end', function(){
			var buf = Buffer.concat(bufs);

			buf = JSON.parse(buf);

			var allCnt = buf.wareDetailComment.allCnt;

			if(!db[weekNumber]){
				db[weekNumber] = [
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0]
				];
			}
			
			var hour = new Date().getHours();
			console.log(hour)
			db[weekNumber][day][Math.floor(hour / 2)] = allCnt;
			fs.writeFile(__dirname + '/db.js', JSON.stringify(db), {}, function(err, res){
				if(err) {
					console.error(err);
				} else {
					console.log('写入成功');
				}
			})
		})
	})
}

var j = schedule.scheduleJob(rule, function(){
	console.log('excuted');
	getCount();
})

getCount();
// setInterval(getCount, 72e5);