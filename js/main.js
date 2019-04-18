var swidth = null;

/*  宽高，边距的全自适应  */
function autoFit() {
	swidth = $(window).width();
	if (swidth > 1365) {
		resize();
	}

}

/*  整屏等比缩放  */
function resize() {
	var winratio = $(window).width() / 1920;
	$('.body1').css({
		transform: 'scale(' + winratio + ')',
		transformOrigin: 'left top',

	});
	$('.body2').css({
		transform: 'scale(' + winratio + ')',
		transformOrigin: 'left top',

	});

}


/*  页面图例的显示/隐藏控制  */
var flag = false;

function listToggle() {
	$('body').on('click', '.tableIcon', function () {
		$(this).toggleClass('rotate180');
		if (!flag) {
			var w = $('.RightBox').outerWidth();
			flag = true;
		}
		$('.RightBox').toggleClass('hidden');
		$('.RightBox').outerWidth(w + 2);
		$('.RightBox').width(w + 2);
	})
}

/*  一般页的弹窗显示/隐藏控制  */
function popContorl() {
	$(document).mouseup(function (e) {
		// 设置目标区域 
		var _con = $('.PopUpBox ');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			// 功能代码
			$('.PopUpBox').removeClass('show');
		}
	});
	$('body').on('click', '.PopUpclose', function () {
		$('.PopUpBox').removeClass('show');
	})
	$('body').on('click', '.Default', function () {
		$('.PopUpBox').toggleClass('show');
	})
}


/*  首页的弹窗控制  */
function indexPopContorl() {
	$(document).mouseup(function (e) {
		// 设置目标区域 
		var _con = $('.PopUpBox ');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			// 功能代码
			$('.PopUpBox').removeClass('show');
		}
	});
	$('body').on('click', '.PopUpclose', function () {
		$('.PopUpBox').removeClass('show');
	})
	$('body').on('click', '.Default', function () {
		var name = $(this).attr('data-name');
		$('.PopUpBox').removeClass('show');
		$(".PopUpBox" + name).addClass('show');
	})
}

/**   功能 字符串中是否含有'active'
 * @param {*} str  需要验证的字符串
 */
function hasActive(str) {
	var reg = /active*/;
	return reg.test(str);
}

/*  主页面和市区页面交替   */
/**   功能 使某个容器自动滚动
 * @param {*} Prodiv  项目容器
 */
function moduleToggle(Prodiv) {
	$('body').on('click', '.GoWuhan', function () {
		intoggle();
		$(Prodiv).removeClass('active');

	})
	$('body').on('click', '.BeOutWuhan', function () {
		intoggle();
		$(Prodiv).addClass('active');
	})

	function intoggle() {
		$('.GoWuhan').toggleClass('show');
		$('.BeOutWuhan').toggleClass('show');
		$('.MapWuhan').toggleClass('active');
	}
}


/**   功能 使某个容器自动滚动
 * @param {*} element  需要滚动的容器
 */
function autoScrollFun(element) {
	var $this = $(element);
	var scrollTimer;
	$this.hover(function () {
		clearInterval(scrollTimer);
	}, function () {
		scrollTimer = setInterval(function () {
			scrollNews($this);
		}, 2000);
	}).trigger('mouseleave');

	function scrollNews(obj) {
		if (obj.find('.table').length) {
			var $self = obj.find('.table');
			//获得第一个tr的高度
			var lineHeight = $self.find('tr:first').height();
			//并根据此高度向上移动
			$self.animate({
				'marginTop': -lineHeight + 'px'
			}, 600, function () {
				$self.css({
					marginTop: 0
					//恢复marginTop,将第一个tr元素，排列放置到末尾，达到循环播放的目的
				}).find('tr:first').appendTo($self);

			})
		}
	}
}

//默认显示 的横轴内容
var arrMonth4 = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
/**   功能 根据数据绘制初始化弹窗线图
 * @param {*} Obj      需要需然的数据对象
 */
function InitPopCanvas(obj) {
	this._obj = obj
	this.elementId = this._obj.elementId;
	this.colorArr = this._obj.colorArr;
	this.seriesArr = this._obj.seriesArr;
	this.unit = this._obj.unit;
	this.popUpChart = echarts.init(document.getElementById(this._obj.elementId));
	this.lineGraphS = this._obj.lineGraphS;
	//重置对象obj
	this.setObj = function (newObj) {
		this._obj = newObj;
	}
	//根据active类名绘图
	this.initCanvas = function () {
		var _colors = []; //暂存 有active类名来展示相应的    颜色的数组
		var _series = []; //暂存 有active类名来展示相应的    sery的数组
		var noActiveN = 0;
		//遍历污染物标签，根据 标签有active类名来展示相应的线图
		for (var i = 0; i < this.lineGraphS.length; i++) {
			var item = this.lineGraphS[i];
			//if(item.className.)
			if (hasActive(item.className)) {
				_colors.push(this._obj.colorArr[i]);
				_series.push(this._obj.seriesArr[i]);
			} else {
				noActiveN++;
			}
			//至少突出第一个污染物，和展示对应的线图
			if (noActiveN === this.lineGraphS.length) {
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
	//根据数据来达到option
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
						color: '#324b75',
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
						color: ['#324b75'],
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

/** 
 *   功能 根据数据绘制弹窗线图
 * @param {*} elementClass  此功能作用在某元素上
 * @param {*} Obj      需要需然的数据对象
 */
function InitPopupObjByData(elementClass, Obj) {
	//elementClass 弹窗的最大容器的独特的类  ,如‘.PopUpBox_jing’
	this.popUpDataObj = {};
	this.popUpDataObj.elementClass = elementClass,
		this.popUpDataObj.xData = Obj.xData;
	this.popUpDataObj.popupObjArr = [];
	this.dataArr = Obj.dataArr;
	this.pollNameList = Obj.pollNameList;
	//初始化某个弹幕的选框的dom,可根据需要来展示，不需要的话，不展示此列
	this.initTablist = function () {
		var innerHtml = '';
		innerHtml = '<span class="selectSpan ">' +
			'<span class="spanInner active" data-key="' + this.pollNameList[0].pollId + '" >' + this.pollNameList[0].pollName + '</span>' +
			'<i class="icon dropIcon"></i>' +
			'</span>' +
			'<ul class="TreeList" >';
		var listArr = '';
		for (var i = 0; i < this.pollNameList.length; i++) {
			var lihtml = '';
			if (i === 0) {
				lihtml = '<li class="treeLi active" data-index="' + this.pollNameList[0].pollId + '" >' + this.pollNameList[i].pollName + '</li>'
			} else {
				lihtml = '<li class="treeLi" data-index="' + this.pollNameList[i].pollId + '">' + this.pollNameList[i].pollName + '</li>'
			}
			listArr += lihtml;
		}
		innerHtml += listArr;
		innerHtml += '</ul>';
		$(this.popUpDataObj.elementClass + ' .selectLi').html(innerHtml);
	}
	this.init = function (elementId) {
		//生成需要渲染第一排污口的线图的 数据  

		var obj = this.setPopupObj(this.dataArr[0]);
		obj.elementId = elementId;

		return obj
	}
	this.setPopupObj = function (obj) { //初始化或更新数据源
		var popupObj2 = {};
		popupObj2.xData = Obj.xData; //注意Obj为原型参数
		//cloneObj(origin, target)
		popupObj2.colorArr = ['#fd4800', '#f1ec3f', '#72e75e', '#0067ff', '#ff00cc', '#b51663', '#ff1a1a'];
		popupObj2.unit = Obj.unit || 'mg/l';
		var keys = Object.keys(obj);
		popupObj2.seriesArr = [];
		for (var i = 0; i < keys.length; i++) {
			var item = keys[i];
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
		return popupObj2;
	}
}

/*************饼图 至少是设置一个高亮******* */

/** 
 *   功能 hover某个圆环上某个元素是，进行高亮显示
 * @param {*} chartNum  饼图原型对象
 * @param {*} data      需要需然的数据对象
 */
function pieAutoHighLight(chartNum, data) {

	setTimeout(function () {
		chartNum.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: 0
		});
		chartNum.on('mouseover', function (params) {

			if (params.name === data[0].name) {
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

		chartNum.on('mouseout', function (params) {

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
			left: 10,
			right: 10
		},
		color: colors,
		series: [{
				name: '访问来源',
				type: 'pie',
				startAngle: 0,
				center: ['48%', '50%'],
				radius: ['45%', '55%'],
				avoidLabelOverlap: false,
				startAngle: 98,
				label: {
					normal: {
						show: true,
						color: '#bbd4ff',
						formatter: format,
						rich: {
							text1: {
								color: '#bbd4ff',
								fontSize: 13,
								padding: 3
							},
							value: {
								color: '#bbd4ff',
								fontSize: 16,
								padding: [6, 0, 6, 0]
							},
							text2: {
								color: '#bbd4ff',
								fontSize: 14,
								padding: [5, 0, 5, 0]
							}

						},
					},
					emphasis: {
						show: true,
						color: '#ffffff'
					}
				},
				labelLine: {
					normal: {
						show: true,
						borderWidth: 3,
					}
				},
				data: data
			}

		]
	};
	return option;
}

//startAngle：饼图达到左右对称的参数
function getPieOption2(colors, format, startAngle, data) {
	var option = {
		grid: {
			top: 0,
			left: 10,
			right: 10
		},
		color: colors,
		series: [{
				name: '访问来源',
				type: 'pie',
				startAngle: 0,
				center: ['50%', '50%'],
				radius: ['60%', '70%'],
				avoidLabelOverlap: false,
				startAngle: startAngle,
				label: {
					normal: {
						show: false,
						position: 'center',
						color: '#bbd4ff',
						align: 'center',
						verticalAlign: 'middle',
						formatter: format,
						rich: {
							text1: {
								color: '#bbd4ff',
								fontSize: 18,
								padding: 3
							},
							value: {
								color: '#bbd4ff',
								fontSize: 24,
								fontWeight: 'bolder',
								padding: [6, 0, 6, 0]
							},
							text2: {
								color: '#bbd4ff',
								fontSize: 12,
								padding: [5, 0, 5, 0]
							}

						},
					},
					emphasis: {
						show: true,
						color: '#ffffff'
					}
				},
				labelLine: {
					normal: {
						show: true,
						borderWidth: 1,
					}
				},
				data: data
			}

		]
	};
	return option;
}