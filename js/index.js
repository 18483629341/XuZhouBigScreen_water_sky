$(document).ready(function () {
	//根据窗口大小自动缩放
	
	//图例的显示隐藏控制
	listToggle();
	//首页弹窗的显示隐藏控制
	IndexPopContorl();
	/*  主页面和市区页面交替   */
	moduleToggle('.MapIndex');
	//设置页面与标准窗口的比例
	setRadio();
	//背景地图根据中间的tab切换
	mapToggle2();
	//自动滚动
	autoScrollFun('#scrollBox1');
	autoScrollFun('#scrollBox2');
	//绘制饼图 
	var Pie1 = echarts.init(document.getElementById('TypePiecanvasBox'));
	Pie1.setOption(option1);
	var Pie2 = echarts.init(document.getElementById('RadioPiecanvasBox'));
	Pie2.setOption(option2);
	PieAutoHighLight(Pie2, qualifiedData);

	//手动站 纱帽弹窗上的线图对象   

	initPopupObjByData0 = new InitPopupObjByData('.PopUpBoxShou', dataShou);
	popupObj0 = initPopupObjByData0.init('P2shouCanvas');//初始化此对象的渲染元素
	initPopCanvas0 = new InitPopCanvas(popupObj0);
	initPopCanvas0.initCanvas();//绘制线图

	//自动站弹窗上的线图线图对象   
	initPopupObjByData10 = new InitPopupObjByData('.PopUpBoxZi', dataZiDate);
	popupObj10 = initPopupObjByData10.init('ziCanvas');//初始化此对象的渲染元素
	initPopupObjByData11 = new InitPopupObjByData('.PopUpBoxZi', dataZiHour);
	popupObj11 = initPopupObjByData11.init('ziCanvas');//初始化此对象的渲染元素
	initPopCanvas1 = new InitPopCanvas(popupObj10);
	initPopCanvas1.initCanvas();//绘制线图


});

window.onresize = function () {
	autoFit();
	setRadio();
	initPopCanvas0.popUpChart.resize();
	initPopCanvas0.initCanvas();
	initPopCanvas1.popUpChart.resize();
	initPopCanvas1.initCanvas();

}
var initPopCanvas0 = null;
var initPopCanvas1 = null;
var initPopupObjByData0 = null;
var popupObj0 = null;
var initPopupObjByData10 = null;
var popupObj10 = null;
var initPopupObjByData11 = null;
var popupObj11 = null;
/*********饼图 渲染 ***** */

var sectionData = [ //不同类型断面的情况   !!!!!需要后台传入的数据
	{ value: 310, name: 'Ⅰ类' },
	{ value: 310, name: 'Ⅱ类' },
	{ value: 310, name: 'Ⅲ类' },
	{ value: 310, name: 'Ⅳ类' },
	{ value: 234, name: 'Ⅴ类' },
	{ value: 135, name: '劣Ⅵ类' },
]
var qualifiedData = [//达标与否断面的情况   !!!!!需要后台传入的数据
	{ value: 55, name: '达标断面' },
	{ value: 5, name: '不达标断面' },
]
/*********popup   线框图的相关数据 /纱帽  ***** */
/*********popup 手动站   线框图的相关数据 / 净化厂 的数据对象数组***** */
var dataShou = {                                      //！！！！！！！！！！！！！！！！！需要后台传输的数据
	xData: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12'],
	promtArr: ['氨氮', '高锰酸钾指数', '化学需氧量', '溶解氧', '总磷'],
	unit: ['mg/l'],
	dataArr: [{
		//name:"",
		'andanArr': [9.0, 6.0, 8.0, 7.0, 6.0, 8.0, 9.0, 6.0, 8.0, 9.0, 6.0, 8.0],
		'MnArr': [4.0, 6.0, 5.5, 5.5, 5.5, 4.0, 6.0, 5.5, 4.0, 5.5, 4.0, 6.0],
		'CheOxyArr': [5.5, 4.0, 5.5, 4.0, 4.0, 6.0, 5.5, 5.5, 5.5, 4.0, 6.0, 6.0],
		'DisOxyArr': [8.0, 9.0, 6.0, 9.0, 6.0, 12.0, 7.0, 6.0, 8.0, 9.0, 6.0, 8.0], //溶解氧
		'PArr': [6.0, 5.5, 6.0, 8.8, 6.6, 5.0, 6.0, 5.5, 4.0, 6.0, 4.0, 5.6]
	},

	],
	waterAssArr: []
}
/*********popup自动站   线框图的相关数据 /  自动站 日期类型***** */
var dataZiDate = {                                              //！！！！！！！！！！！！！！！！！需要后台传输的数据
	xData: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12'],
	promtArr: ['氨氮', '高锰酸钾指数', '总磷'],
	unit: ['mg/l'],
	dataArr: [
		{
			andanArr: [6.0, 8.0, 9.0, 9.0, 6.0, 8.0, 7.0, 6.0, 8.0, 9.0, 6.0, 8.0],
			MnArr: [4.0, 6.0, 5.5, 4.0, 5.5, 4.0, 6.0, 5.5, 5.5, 5.5, 4.0, 6.0],
			PArr: [6.0, 5.5, 6.0, 8.8, 6.6, 5.0, 6.0, 5.5, 4.0, 6.0, 4.0, 5.6]
		},

	]
}
/*********popup自动站  线框图的相关数据 /  自动站 小时类型***** */
var dataZiHour = {                                              //！！！！！！！！！！！！！！！！！需要后台传输的数据
	xData: ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
	promtArr: ['氨氮', '高锰酸钾指数', '总磷'],
	unit: ['mg/l'],
	dataArr: [
		{
			andanArr: [9.0, 6.0, 8.0, 7.0, 6.0, 8.0, 9.0, 6.0, 8.0, 9.0, 6.0, 8.0],
			MnArr: [4.0, 6.0, 5.5, 5.5, 5.5, 4.0, 6.0, 5.5, 4.0, 6.0, 5.5, 4.0, 6.0],
			PArr: [6.0, 5.5, 6.0, 8.8, 6.6, 5.0, 6.0, 5.5, 4.0, 6.0, 7.0, 4.0, 5.6]
		},

	]
}

//startAngle 为饼图的其实角度的计算
var startAngle = parseInt(90 - qualifiedData[1].value / (qualifiedData[0].value + qualifiedData[1].value) / 2 * 360);
//水质监测状况     根据数据来设置渲染饼图的option
var option1 = getPieOption(['#4ea9ff', '#0067ff', '#00ff00', '#ffff00', '#ffd700', '#fc0105'], '{text1|{b}}{value|{d}}{text2|%}', sectionData);
//水质达标状况     根据数据来设置渲染饼图的option
var option2 = getPieOption2(['#0067ff', 'transparent'], '{text1|{b}}\n{value|{d}}{text2|%}', startAngle, qualifiedData);

//手动站弹窗   线图的污染物的切换，引起线图的相应的改变
$("body").on('click', '.PopUpBoxShou .tabSpan', function () {
	$(this).toggleClass('active');
	initPopCanvas0.initCanvas();
})

//自动站弹窗   线图的污染物的切换，引起线图的相应的改变
$("body").on('click', '.PopUpBoxZi .tabLi', function () {
	$(this).toggleClass('active');
	initPopCanvas1.initCanvas();
})

//自动站弹窗   线图的：日/小时 切换
$("body").on('click', '.PopUpBoxZi .TimeTypeSpan', function () {
	$('.PopUpBoxZi .TimeTypeSpan').removeClass('active');
	$(this).toggleClass('active');
	var type = $(this).attr('data-name');
	if (type === 'hour') {
		initPopCanvas1 = new InitPopCanvas(popupObj11);
		initPopCanvas1.initCanvas();
	} else {

		initPopCanvas1 = new InitPopCanvas(popupObj10);
		initPopCanvas1.initCanvas();
	}
	initPopCanvas1.initCanvas();
})

/* skyblue页面 地图div的交互   */
var mainActive = 'MapIndex'; //主页面活动的模块div
function mapToggle2() {
	//P1tabLi
	$("body").on('click', '.GisTabLi', function () {
		$(this).siblings('.GisTabLi').removeClass('active');
		$(this).addClass('active');
		var type = $(this).attr("data-type");
		$('.MapBox').removeClass('active');
		$('.MapBox[data-type=' + type + ']').addClass('active');
		$('.LeftPane').removeClass('active');
		$('.LeftPane[data-type=' + type + ']').addClass('active');
		if (type === "Compliance") {
			mainActive = 'MapIndex1';
			$('.LeftSummaryTitle').html('水质达标状况');
			$('.IndexRightBox').css({ display: 'none' });
		} else if (type === "WaterMonitor") {
			mainActive = 'MapIndex';
			$('.LeftSummaryTitle').html('水质监测状况');
			$('.IndexRightBox').css({ display: 'block' });
		}
	})
}

$("body").on('click', '.PopUpBoxShou .lineGraph', function () {

	$(this).toggleClass('active');
	$('.PopUpBoxShou .lineCanvas').addClass('active');
	initPopCanvas0.initCanvas();
})


