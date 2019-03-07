$(document).ready(function () {
	//
	$(window).load(function () {
		autoFit();
		listToggle();
		P2popContorl();
		moduleToggle('.map2');
		setRadio();
		mapToggle2();
		autoScrollFun('#scrollBox1');
		autoScrollFun('#scrollBox2');
		//绘制饼图 
			var Pie1=echarts.init(document.getElementById('typePiecanvasBox'));
			Pie1.setOption(option1);
			var Pie2=echarts.init(document.getElementById('radioPiecanvasBox'));
			Pie2.setOption(option2);
			PieAutoHighLight(Pie2,qualifiedData);

		//手动站 纱帽弹窗上的线图   绘制
			initPopupObjByData0 = new InitPopupObjByData('.PopUpBox_sha', dataSha);
			popupObj0 = initPopupObjByData0.init('P2comCanvas');
			initPopCanvas0= new InitPopCanvas(popupObj0);
			initPopCanvas0.initCanvas();
			
        //自动站弹窗上的线图   绘制
			initPopupObjByData10 = new InitPopupObjByData('.PopUpBox_zi', dataZiDate);
			popupObj10 = initPopupObjByData10.init('P2ziCanvas');
			initPopupObjByData11 = new InitPopupObjByData('.PopUpBox_zi', dataZiHour);
			popupObj11 = initPopupObjByData11.init('P2ziCanvas');
			initPopCanvas1 = new InitPopCanvas(popupObj10);
			initPopCanvas1.initCanvas();
    
		
	});
});

window.onresize = function () {
	autoFit();
	autoFitNav();
	autoFitContent();
	setRadio();  
	initPopCanvas0.popUpChart.resize();  
	initPopCanvas0.initCanvas();
	initPopCanvas1.popUpChart.resize();
	initPopCanvas1.initCanvas();
	
}
let initPopCanvas0=null;
let initPopCanvas1=null;
var initPopupObjByData0=null;
var popupObj0=null;
var initPopupObjByData10=null;
var popupObj10=null;
var initPopupObjByData11=null;
var popupObj11=null;
/*********饼图 渲染 ***** */
 
var sectionData=[ //不同类型断面的情况   !!!!!需要后台传入的数据
	{value:310, name:'Ⅰ类'},
	{value:310, name:'Ⅱ类'},
	{value:310, name:'Ⅲ类'},
    {value:310, name:'Ⅳ类'},
	{value:234, name:'Ⅴ类'},
	{value:135, name:'劣Ⅵ类'},    
]
var qualifiedData=[//达标与否断面的情况   !!!!!需要后台传入的数据
		{value:55, name:'达标断面'},
		{value:5, name:'不达标断面'},
]
/*********popup   线框图的相关数据 /纱帽  ***** */
/*********popup 手动站   线框图的相关数据 / 净化厂 的数据对象数组***** */
var dataSha = {                                      //！！！！！！！！！！！！！！！！！需要后台传输的数据
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
var dataZiDate={                                              //！！！！！！！！！！！！！！！！！需要后台传输的数据
	xData:['10-01','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10','10-11','10-12'],
	promtArr: ['氨氮', '高锰酸钾指数','总磷'],
	unit: ['mg/l'],
	dataArr:[
		{
			andanArr : [ 6.0, 8.0, 9.0,9.0, 6.0, 8.0,7.0, 6.0, 8.0,  9.0, 6.0, 8.0],
			MnArr : [ 4.0, 6.0, 5.5,  4.0,  5.5,4.0, 6.0, 5.5,5.5, 5.5, 4.0, 6.0], 
			PArr : [6.0, 5.5, 6.0, 8.8, 6.6, 5.0, 6.0, 5.5, 4.0, 6.0, 4.0, 5.6]
		},
		
	]
}
/*********popup自动站  线框图的相关数据 /  自动站 小时类型***** */
var dataZiHour={                                              //！！！！！！！！！！！！！！！！！需要后台传输的数据
	xData:['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'],
	promtArr: ['氨氮', '高锰酸钾指数','总磷'],
	unit: ['mg/l'],
	dataArr:[
		{	
			andanArr :[9.0, 6.0, 8.0,7.0, 6.0, 8.0, 9.0, 6.0, 8.0,  9.0, 6.0, 8.0],
			MnArr :  [4.0, 6.0, 5.5,5.5, 5.5, 4.0, 6.0, 5.5,  4.0, 6.0, 5.5, 4.0, 6.0], 
			PArr :[6.0, 5.5, 6.0, 8.8, 6.6, 5.0, 6.0, 5.5, 4.0, 6.0, 7.0, 4.0, 5.6]
		},
		
	]
}

var startRidio=parseInt(90-qualifiedData[1].value/(qualifiedData[0].value+qualifiedData[1].value)/2*360);
var option1=getPieOption(['#4ea9ff','#0067ff','#00ff00','#ffff00','#ffd700','#fc0105'],'{text1|{b}}{value|{d}}{text2|%}',sectionData);
var option2=getPieOption2(['#0067ff','transparent'],'{text1|{b}}\n{value|{d}}{text2|%}',startRidio,qualifiedData);

$("body").on('click','.PopUpBox_sha .tabSpan',function(){
	$(this).toggleClass('active');
	initPopCanvas0.initCanvas();
})


$("body").on('click','.PopUpBox_zi .tabLi',function(){
	$(this).toggleClass('active');
	initPopCanvas1.initCanvas();
})
var isFirst=true;
$("body").on('click','.PopUpBox_zi .timeTypeSpan',function(){
	$('.PopUpBox_zi .timeTypeSpan').removeClass('active');
	$(this).toggleClass('active');
	var type=$(this).attr('data-name');
	if(type=='hour'){
		initPopCanvas1 = new InitPopCanvas(popupObj11);
		initPopCanvas1.initCanvas();
	}else{
     
		initPopCanvas1 = new InitPopCanvas(popupObj10);
		initPopCanvas1.initCanvas();
	}
	initPopCanvas1.initCanvas();
})

/* 地图div的交互   */
var mainActive = 'map2'; //主页面活动的模块div
function mapToggle2(){
	//P1tabLi
	$("body").on('click','.P6tabLi',function(){
		$(this).siblings('.P6tabLi').removeClass('active');
		$(this).addClass('active');
		var type=$(this).attr("data-type");
		$('.MapBox').removeClass('active');
		$('.MapBox[data-type='+type+']').addClass('active');
		$('.leftPane').removeClass('active');
		$('.leftPane[data-type='+type+']').addClass('active');
	    if(type=="isQulified"){
            mainActive='map21';
			$('.js_title').html('水质达标状况');
			$('.P2RightBox').css({display:'none'});           
		}else if(type=="waterMonitor"){
            mainActive='map2';
			$('.js_title').html('水质监测状况');
			$('.P2RightBox').css({display:'block'});  
		}
    })
}

	$("body").on('click', '.PopUpBox_sha .lineGraph', function () {
		console.log(1);
		$(this).toggleClass('active');
		$('.PopUpBox_sha .lineCanvas').addClass('active');
		initPopCanvas0.initCanvas();
	})


