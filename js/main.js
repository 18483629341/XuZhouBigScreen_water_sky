
/****************************
 *   此js主要对样式的控制：宽高，边距的全自适应
 *          tab切换时对样式的控制
 *     
 * *************** */
// var LeftNav=document.querySelector(".LeftNav");
// var RightNav=document.querySelector(".RightNav");
// var tablis=document.querySelectorAll(".tabli");
// var TabLiContents=document.querySelectorAll(".TabLiContent");
var swidth =null;
var W=null;
//header部分里面的所有元素的宽高全自适应方法

function autoFit(){
	 swidth = $(window).width();
	//if(swidth > 1366 || swidth === 1366){
		resize();
	//}
}
//resize();
//整屏等比缩放


function resize() {
	var winratio = $(window).width()/1920;
	$('.body1').css({
	  transform: "scale("+winratio+")",
	  transformOrigin: "left top"
	});
	$('.body2').css({
		transform: "scale("+winratio+")",
		transformOrigin: "left top"
	  });
	//$(window).height(parseInt(winratio*2160));
}




var flag=false;
function listToggle(){
    $("body").on('click','.tableIcon',function(){
		$(this).toggleClass('rotate180');
		if(!flag){
			var w=$('.RightBox').outerWidth();
			flag=true;
		}
		$('.RightBox').toggleClass('hidden');
		$('.RightBox').outerWidth(w+2);
		$('.RightBox').width(w+2);
	})
}

/**************弹窗显示/隐藏控制****** */

function popContorl(){
    $(document).mouseup(function(e){
        var _con = $('.PopUpBox '); // 设置目标区域 
       if(!_con.is(e.target) && _con.has(e.target).length === 0){ 
           // Mark 1 some code... // 功能代码
           $('.PopUpBox').removeClass('show');
    }});
    $("body").on('click','.PopUpclose',function(){
        $('.PopUpBox').removeClass('show');
    })
    $("body").on('click','.Default',function(){
        $('.PopUpBox').toggleClass('show');
    })
}
function P2popContorl(){
    $(document).mouseup(function(e){
        var _con = $('.PopUpBox '); // 设置目标区域 
       if(!_con.is(e.target) && _con.has(e.target).length === 0){ 
           // Mark 1 some code... // 功能代码
           $('.PopUpBox').removeClass('show');
    }});
    $("body").on('click','.PopUpclose',function(){
        $('.PopUpBox').removeClass('show');
    })
    $("body").on('click','.Default',function(){	
		let name=$(this).attr('data-name');
		$('.PopUpBox').removeClass('show');
		$(".PopUpBox"+name).addClass('show');
    })
}
function hasActive(str){
    var reg=/active*/;
    return reg.test(str);
}
var radio=1;
function setRadio(){
    radio=parseFloat(swidth/3840); 
}
/*  主页面和市区页面交替   */
function moduleToggle(Prodiv) {
	$("body").on('click', '.goWuhan', function () {
		intoggle();
		$(Prodiv).removeClass('active');
		
	})
	$("body").on('click', '.GoAwayWuhan', function () {
		intoggle();
		$(Prodiv).addClass('active');
	})

	function intoggle() {
		$('.goWuhan').toggleClass('show');
		$('.GoAwayWuhan').toggleClass('show');
		$('.mapWuhan').toggleClass('active');
	}
}
/************scroll bar 封装方法******* */
function autoScrollFun(element){//参数为需要滚动的容器
	var $this = $(element);
    var scrollTimer;
    $this.hover(function() {
        clearInterval(scrollTimer);
    }, function() {
        scrollTimer = setInterval(function() {
            scrollNews($this);
        }, 2000);
    }).trigger("mouseleave");

    function scrollNews(obj) {
		//console.log($(element).find(".table"));
		if(obj.find(".table").length){
			var $self = obj.find(".table");
			var lineHeight = $self.find("tr:first").height(); 
			$self.animate({
				"marginTop": -lineHeight + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("tr:first").appendTo($self);
			})
		}
    }
		
}
var arrMonth4=['1月','2月', '3月','4月','5月', '6月','7月','8月', '9月','10月', '11月','12月']  //!!!!!!!需要后台引入的数据

function InitPopCanvas(obj) {
	this._obj = obj
	this.elementId = this._obj.elementId;
	this.colorArr = this._obj.colorArr;
	this.seriesArr = this._obj.seriesArr;
	this.unit = this._obj.unit;
	this.popUpChart = echarts.init(document.getElementById(this._obj.elementId));
	this.lineGraphS = this._obj.lineGraphS;
	this.setObj = function (newObj) {
		
		this._obj = newObj;
		console.log(this._obj);
	}
	this.initCanvas = function () {
		let _colors = [];
		let _series = [];
		var noActiveN = 0;
		for (let i = 0; i < this.lineGraphS.length; i++) {
			var item = this.lineGraphS[i];
			//if(item.className.)
			if (hasActive(item.className)) {
				_colors.push(this._obj.colorArr[i]);
				_series.push(this._obj.seriesArr[i]);
			} else {
				noActiveN++;
			}

			if (noActiveN == this.lineGraphS.length) { //至少显示第一条
				_colors = this._obj.colorArr[0];
				_series = this._obj.seriesArr[0];
				$(this.lineGraphS[0]).addClass('active');
			}
			//if(item.className.)
		}
		var newOption = this.getPopOption(_colors, _series);
		
		this.popUpChart.setOption(newOption, {
			notMerge: true,
		});
	}
	this.getPopOption = function (colorP, seriesP) {
		var option = {
			color: colorP, //调色板
			tooltip: {
				//show:false,
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					label: {
						backgroundColor: '#6a7985',
						fontSize: 14
					}
				},
			},
			grid: {
				top: 40,
				left: '0%',
				right: 63,
				bottom: 20,
				containLabel: true,
				show: false
			},
			xAxis: {
				type: 'category',
				onZero: true,
				axisLine: { //X轴线的设置
					show: false,
					lineStyle: {
						color: "#324b75",
						type: 'dashed',
						align: 'right',
						padding: [3, 4, 5, 10]
					}
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: true,
					rotate: -45,
					textStyle: {
						color: '#c3d4ff',
						fontSize: 14,
					}
				},
				data: this._obj.xData || arrMonth4,
				boundaryGap: false
			},
			yAxis: {
				type: 'value',
				name: this._obj.unit,
				nameLocation: 'end',
				nameTextStyle: {
					color: '#c3d4ff',
					align: 'left',
					padding: [0, 0, 5, 0],
					fontSize: 14
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#c3d4ff',
						fontSize: 14,

					},
					formatter: this._obj.formatter || '{value}'
				},
				axisLine: { //Y轴线的设置
					show: false,

				},
				axisTick: {
					show: false
				},
				splitLine: { //Y轴线的设置
					show: true,
					lineStyle: {
						color: ["#324b75"],
						type: 'dashed'
					}
				},
				max: this._obj.max,
				min: this._obj.min,
				boundaryGap: ['0%', '0%']
			},
			series: seriesP
		};
		return option;
	}

}

function InitPopupObjByData(elementClass, Obj) { //将数据库转化为绘图 针对排污情况P4页面的方法  需要的含数组的对象
	//elementClass 弹窗的最大容器的独特的类  ,如‘.PopUpBox_jing’
	this.popUpDataObj = {};
	this.popUpDataObj.elementClass = elementClass,
	this.popUpDataObj.xData = Obj.xData;
	this.popUpDataObj.popupObjArr = [];
	this.dataArr = Obj.dataArr;
	this.pollNameList=Obj.pollNameList;
	this.initTablist = function () { //初始化某个弹幕的选框的dom
		let inhtml = '';
		inhtml = '<span class="selectSpan ">' +
			'<span class="spanInner active" data-key="'+this.pollNameList[0].pollId+'" >' + this.pollNameList[0].pollName + '</span>' +
			'<i class="icon dropIcon"></i>' +
			'</span>' +
			'<ul class="TreeList" >';
		let listArr = '';
		for (let i = 0; i < this.pollNameList.length; i++) {
			let lihtml = '';
			if (i == 0) {
				lihtml = '<li class="treeLi active" data-index="'+this.pollNameList[0].pollId+'" >' + this.pollNameList[i].pollName + '</li>'
			} else {
				lihtml = '<li class="treeLi" data-index="'+this.pollNameList[i].pollId+'">' + this.pollNameList[i].pollName + '</li>'
			}
			listArr += lihtml;
		}
		inhtml += listArr;
		inhtml += '</ul>';
		$(this.popUpDataObj.elementClass + ' .selectLi').html(inhtml);
	}
	this.init = function (elementId) {
		//生成需要渲染第一排污口的线图的 数据  
		console.log(elementId);
		let obj = this.setPopupObj(this.dataArr[0]);
		obj.elementId = elementId;
		console.log(obj);
		return obj
	}
	this.setPopupObj = function (obj) { //初始化或更新数据源
		var popupObj2 = {};
		popupObj2.xData = Obj.xData; //注意Obj为原型参数
		//cloneObj(origin, target)
		popupObj2.colorArr = ["#fd4800", "#f1ec3f", "#72e75e",'#0067ff', '#ff00cc', "#b51663","#ff1a1a"];
		popupObj2.unit = Obj.unit||'mg/l';
		var keys = Object.keys(obj);
		popupObj2.seriesArr = [];
		for (let i = 0; i < keys.length; i++) {
			let item = keys[i];
			var seryObj = {
				name: Obj.promtArr[i],
				type: 'line',
				data: obj[item],
				smooth: true,
				lineStyle: {
					width: 2,
				},
				symbol: 'none'
			};
			//将所有数组  依次加入到   seriesArr数组中
			popupObj2.seriesArr.push(seryObj);
		}
		popupObj2.Ylabel = function (value) {
			return value.toFixed(1);
		};
		popupObj2.Yvalue = function (value) {
			return value.toFixed(1);
		};
		popupObj2.min = '0';
		popupObj2.max = function (value) {
			var a = value.max * 1.2;
			return a.toFixed(1);
		};
		popupObj2.lineGraphS = $(this.popUpDataObj.elementClass + ' .lineGraph');
       console.log(popupObj2);

		return popupObj2;
	}
}
/* .深度克隆 对象（针对 对象 或 对象数组 或 数组） 经典 */
 
function cloneObj(origin, target) {   
	var target = target || {};
	if (origin instanceof Array) {
		target = [];
	} else if (origin == null) {//null或者undefined时
		target = origin;
	}
	for (var key in origin) { //此方法即可遍历对象，也可遍历数组
		target[key] = typeof val === 'object' ? cloneObj(origin[key], target[key]) : origin[key];
		//typeof val==='object' 数组和对象以及null
	}
	return target;
}
/*************饼图 至少是设置一个高亮******* */
/******
 * chartNum  饼图原型对象
 * data      需要需然的数据对象
 */
function PieAutoHighLight(chartNum,data){
	
    setTimeout(function() {
		chartNum.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: 0
		});
        chartNum.on('mouseover', function(params) {
            console.log('over');
            if (params.name == data[0].name) {
                chartNum.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            } else {
                chartNum.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }
        });
    
        chartNum.on('mouseout', function(params) {
            console.log('out');
            chartNum.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        });
    }, 1000);
}
/**
 * 
 * @param {*} colors 图形的颜色设置组合
 * @param {*} format label的内容的显示的各式设置
 * @param {*} data   图形展示的基本数据
 */
function getPieOption(colors, format, data) {
    var option = {
        grid: {
			top: 0,
			left:10,
			right:10
        },
        color: colors,
        series: [{
                name: '访问来源',
                type: 'pie',
                startAngle: 0,
                center: ['48%', '50%'],
                radius: ['45%', '55%'],
                avoidLabelOverlap: false,
				startAngle:98,
                label: {
                    normal: {
                        show: true,
                        color: '#bbd4ff',
                        formatter:format ,
                        rich: {
                            text1: {
                                color: '#bbd4ff',
                                fontSize: 13,
                                padding: 3
                            },
                            value: {
                                color: '#bbd4ff',
                                fontSize:16,
                                padding: [6,0,6,0]
                            },
                            text2:{
                                color: '#bbd4ff',
                                fontSize: 14,
                                padding: [5,0, 5,0]
                            }
                            
                        },
                    },
                    emphasis: {
						show: true,
						color:'#ffffff'
                    }
                },
                labelLine: {
                    normal: {
						show: true,
						borderWidth:3,
                    }
                },
                data: data
            }

        ]
    };
    return option;
}
function getPieOption2(colors, format,startRadio, data){
	var option = {
        grid: {
			top: 0,
			left:10,
			right:10
        },
        color: colors,
        series: [{
                name: '访问来源',
                type: 'pie',
                startAngle: 0,
                center: ['50%', '50%'],
                radius: ['60%', '70%'],
                avoidLabelOverlap: false,
				startAngle:startRadio,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        color: '#bbd4ff',
                        align: 'center',
                        verticalAlign: 'middle',
                        formatter:format ,
                        rich: {
                            text1: {
                                color: '#bbd4ff',
                                fontSize: 18,
                                padding: 3
                            },
                            value: {
                                color: '#bbd4ff',
								fontSize: 24,
								fontWeight:'bolder',
                                padding: [6,0,6,0]
                            },
                            text2:{
                                color: '#bbd4ff',
                                fontSize: 12,
                                padding: [5,0, 5,0]
                            }
                            
                        },
                    },
                    emphasis: {
						show: true,
						color:'#ffffff'
                    }
                },
                labelLine: {
                    normal: {
						show: true,
						borderWidth:1,
                    }
                },
                data: data
            }

        ]
    };
    return option;
}