var https = require('https');
var url = 'https://item.m.jd.com/ware/getDetailCommentList.json?wareId=3867555';
var fs = require('fs');
var path = require('path');

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
	hour = new Date().getHours(),
	weekNumber = '' + year + getWeekNumber(year, month, date);

function getCount(){
	https.get(url, function(res){
		var json;
		res.on('data', function(data){
			json = data;
		})
		res.on('end', function(){
			json = JSON.parse(json);
			var allCnt = json.wareDetailComment.allCnt;

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
			db[weekNumber][day][Math.floor(hour / 2)] = allCnt;
			fs.writeFile(__dirname + '/db.js', new Buffer(JSON.stringify(db)), {}, function(err, res){
				if(err) {
					console.error(err);
				} else {
					console.log('写入成功');
				}
			})
		})
	})
}


getCount();
setInterval(getCount, 72e5);