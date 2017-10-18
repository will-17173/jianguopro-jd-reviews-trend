var myChart = echarts.init(document.getElementById('charts'));
var db,
	data,
	year = new Date().getFullYear(),
	month = new Date().getMonth() + 1,
	date = new Date().getDate(),
	day = new Date().getDay() ? (new Date().getDay() - 1) : 6,
	currentWeekNumber = '' + year + getWeekNumber(year, month, date);

var app = {
	init: function(){
		this.bindEvent();
		this.renderTab();
		this.render(currentWeekNumber);
	},
	bindEvent: function(){
		var that = this;
		$(document).on('click', '[data-week]', function(){
			if($(this).hasClass('active')){
				return;
			}
			data = [];
			$(this).addClass('active').siblings().removeClass('active');
			that.render($(this).data('week'));
		});
	},
	getDiff: function(weekNo){
		data = $.extend(true, [], db[weekNo]);
		
		for(var i = data.length-1; i >= 0; i--){
			for(var j = data[i].length-1; j >= 0; j--){

				//大于0的数据才要处理
				if(data[i][j] > 0){

					// 如果前一个数据是0(即整个项目刚开始时采集的第一个数据), 这个时段评价数置为0
					if(data[i][j-1] == 0){
						data[i][j] = 0;
						continue;
					}

					// 除周一外每天的第一个数据, 需要它减去前一天的最后一个数据
					if(i > 0 && j == 0 && data[i-1][11] > 0){
						data[i][j] = data[i][j] - db[weekNo][i-1][11];
						continue;
					}

					// 周一的第一个数据, 把它减去上一周的最后一个数据
					if(i == 0 && j == 0){
						if($.isArray(db[weekNo-1]) && db[weekNo-1][6][11] > 0){
							data[i][j] = db[weekNo-1][6][11]
						} else{
							data[i][j] = 0;
						}
						continue;
					}

					// 时段评价数 = 该时段数据 - 上时段数据
					data[i][j] = data[i][j] - db[weekNo][i][j-1];
				}
			}
		}
	},
	render: function(weekNo){
		this.getDiff(weekNo);

		for(var i = 0; i < 12; i++){
			for(var j = 0; j < 7; j++){
				option.series[i].data[j] = data[j][i];
			}
		}
		weekNo = '' + weekNo;

		option.title.text = weekNo.substr(0,4) + '年' + weekNo.substr(4, 6) + '周';
		myChart.setOption(option);
	},
	renderTab: function(){
		for(var key in db){
			$('<a href="javascript:;" class="list-group-item" data-week="' + key + '">' + key.substr(0,4) + '年' + key.substr(4,5) + '周</a>').appendTo('.list-group');
		}

		$('.list-group-item').each(function(){
			var weekNo = $(this).attr('data-week');
			if(weekNo == currentWeekNumber){
				$(this).addClass('active');
			}
		})
	}
}

$.getJSON('db.js', function(res){
	db = res;
	app.init();
})
