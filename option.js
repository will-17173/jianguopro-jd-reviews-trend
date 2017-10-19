var option = {
    color: ['#3398DB'],
	title: {
		text: '2017年第42周'
	},
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['周一','周二','周三','周四','周五','周六','周日']
            // data : ['2017-10-09', '2017-10-10','2017-10-11','2017-10-12','2017-10-13','2017-10-14','2017-10-14']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'0:00 - 2:00',
            type:'bar',
            data:[null, 111]
        },
        {
            name:'2:00 - 4:00',
            type:'bar',
            data:[320]
        },
        {
            name:'4:00 - 6:00',
            type:'bar',
            data:[320]
        },
        {
            name:'6:00 - 8:00',
            type:'bar',
            data:[320]
        },
        {
            name:'8:00 - 10:00',
            type:'bar',
            data:[320]
        },
        {
            name:'10:00 - 12:00',
            type:'bar',
            data:[320]
        },
        {
            name:'12:00 - 14:00',
            type:'bar',
            data:[320]
        },
        {
            name:'14:00 - 16:00',
            type:'bar',
            data:[320]
        },
        {
            name:'16:00 - 18:00',
            type:'bar',
            data:[320]
        },
        {
            name:'18:00 - 20:00',
            type:'bar',
            data:[320]
        },
        {
            name:'20:00 - 22:00',
            type:'bar',
            data:[320]
        },
        {
            name:'22:00 - 24:00',
            type:'bar',
            data:[320]
        }

    ]
};
