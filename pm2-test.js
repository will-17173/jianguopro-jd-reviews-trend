var https = require('https');
var url = 'https://item.m.jd.com/ware/getDetailCommentList.json?wareId=3867555';
var fs = require('fs');
var path = require('path');
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var sec = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
rule.second = sec;
var j = schedule.scheduleJob(rule, function(x){
	var s = new Date().getSeconds();
	fs.writeFile(__dirname + '/db--test.js', s, {}, function(err, res){
		if(err) {
			console.error(err);
		} else {
			console.log('写入成功');
		}
	})

})