$(document).ready(function () {

    // 排名相关点击交互  
    rankToggle();

    //自动滚动  
    autoScrollFun('#scrollBox1');
    autoScrollFun('#scrollBox2');
    autoScrollFun('#scrollBox3');
    //弹窗显示/隐藏控制
    popContorl();
    // 使用刚指定的配置项和数据显示图表。
    //饼图
    myChart21.setOption(option21);
    myChart22.setOption(option22);
    myChart23.setOption(option23);
    myChart24.setOption(option24);
    //左列表线图
    myChart3.setOption(option31);
    myChart4.setOption(option32);
    //弹窗上的线图绘制
    myChart5.setOption(option41);

    // initPopCanvas=new InitPopCanvas(popupObj);
    // initPopCanvas.initCanvas();



});
var initPopCanvas = null;
window.onresize = function () {
    autoFit();

    //根据窗口的大小 变动图表 --- 重点 
    myChart21.resize();
    myChart22.resize();
    myChart23.resize();
    myChart24.resize();
    myChart3.resize();
    myChart5.resize();
    initPopCanvas.popUpChart.resize();
    initPopCanvas.initCanvas();
}

/* 相应也页面的饼状图渲染  */
var myChart21 = echarts.init(document.getElementById('CompRateCanvas021'));
var myChart22 = echarts.init(document.getElementById('CompRateCanvas022'));
var myChart23 = echarts.init(document.getElementById('CompRateCanvas023'));
var myChart24 = echarts.init(document.getElementById('CompRateCanvas024'));
var option21 = setOptionfun('#023157', '98.5%');
var option22 = setOptionfun('#03143a', '93%');
var option23 = setOptionfun('#023157', '70%');
var option24 = setOptionfun('#03143a', '64.5%');

/**   功能 指定饼状图的配置项和数据
 * @param {*} color  颜色数组
 * * @param {*} radius  最大半径的比例
 */
function setOptionfun(color, radius) {
    //达标的数据和不达标的数据组成的数组     //!!!!!!!需要后台引入的数据
    var arr = [78.5, 21.5];
    var option = {
        color: [color],
        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            //圆环的绘画的起始角度
            startAngle: 0,
            //圆环的半径比例
            radius: [0, radius],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            data: [{
                //注意：这里是达标的数据1，还需要不达标的数据2（在下面），才能展示正确的百分比
                value: arr[0],
                name: '01',
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                }
            }, {
                name: '02',
                //注意：这里是不达标的数据2
                value: arr[1],
            }]
        }]
    };
    return option;
}

/*   地图div的交互   */
$('body').on('click', '.TypeTab .NavLi', function () {
    $('.TypeTab .NavLi').removeClass('active');
    $(this).addClass('active');
    var type = $(this).attr('data-type')
    $('.MapBox').removeClass('active');
    $('.MapBox[data-type=' + type + ']').addClass('active');
    $('.SkyLeftSummary').removeClass('show');
    $('.SkyLeftSummary[data-type=' + type + ']').addClass('show');
})


$('body').on('click', '.GisTabLi', function () {
    $('.GisTabLi').removeClass('active');
    $(this).addClass('active');
    var type = null;
    if (!$(this).attr('data-type')) {
        type = $(this).find('.NavLi.active').attr('data-type');
        $('.mapTabCon .navTab').addClass('active');

    } else {
        type = $(this).attr('data-type');
        $('.mapTabCon .navTab').removeClass('active');

    }
    $('.MapBox').removeClass('active');
    $('.MapBox[data-type=' + type + ']').addClass('active');

})


/* 排名相关点击交互   */
function rankToggle() {
    $('body').on('click', '.RankTabLi', function () {
        $(this).siblings('.RankTabLi').removeClass('active');
        $(this).addClass('active');
    })
    $('body').on('click', '.SkyArrowIcon', function () {
        $(this).siblings('.SkyArrowIcon').removeClass('active');
        $(this).addClass('active');
    })
}

/* 左边列表页面的线图渲染   */
var myChart3 = echarts.init(document.getElementById('GoodWeatherCanvas'));
var myChart4 = echarts.init(document.getElementById('PmCanvas'));
var myChart5 = echarts.init(document.getElementById('SkypopUpcanvas'));
var areaBack = 'rgba(1,53,91,.3)';
//!!!!!!!需要后台引入的数据  全省年均值的数据
var goodWheatherData = {
    arrMonth: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    arrThisYear: ['70', '60', '80', '90', '60', '80', '90', '60', '80', '90', '60', '80'],
    aIndex: '75',
    arrLastYear: ['55', '55', '40', '60', '55', '40', '60', '55', '40', '60', '55', '40', '60'],
    label: '单位：%',
    formatter: '{value}',
    max: '100',
    colors: ['#00e4ff', '#f7823c', '#72e75e']
}

var PMData = {
    arrMonth: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    arrThisYear: ['250', '160', '240', '190', '160', '80', '90', '160', '80', '90', '160', '180'],
    aIndex: '100',
    arrLastYear: ['155', '155', '140', '160', '155', '140', '160', '155', '140', '160', '155', '140', '160'],
    label: 'ug/m3',
    formatter: '{value}',
    max: function (value) {
        var a = value.max * 1.2;
        return a.toFixed(1);
    },
    colors: ['#00e4ff', '#f7823c', '#72e75e']
}

/*弹窗的线图渲染数据        */
//!!!!!!!需要后台引入的数据 弹窗上某站点的数据
var goodWheatherData1 = {
    arrMonth: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    arrThisYear: ['70', '60', '80', '90', '60', '80', '90', '60', '80', '90', '60', '80'],
    // aIndex:'',
    arrLastYear: ['55', '55', '40', '60', '55', '40', '60', '55', '40', '60', '55', '40', '60'],
    label: '单位：%',
    formatter: '{value}',
    max: '100',
    colors: ['#00cdff', '#fbe83a']
}
var PMData1 = {
    arrMonth: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    arrThisYear: ['250', '160', '240', '190', '160', '80', '90', '160', '80', '90', '160', '180'],
    // aIndex:'',
    arrLastYear: ['155', '155', '140', '160', '155', '140', '160', '155', '140', '160', '155', '140', '160'],
    label: 'ug/m3',
    formatter: '{value}',
    max: function (value) {
        var a = value.max * 1.2;
        return a.toFixed(1);
    },
    colors: ['#00cdff', '#fbe83a']
}
var option31 = getOption3(goodWheatherData);
var option32 = getOption3(PMData);
var option41 = getOption3(goodWheatherData1);
var option42 = getOption3(PMData1);

/**
 * 
 * @param {*} obj 对象，图形渲染来源 
 */
function getOption3(obj) {
    var option = {
        color: obj.colors, //调色板
        tooltip: {
            //show:false,
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label: {
                    backgroundColor: '#6a7985',
                    fontSize: 7
                }
            },
        },
        grid: {
            top: 40,
            left: '0%',
            right: '0%',
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
            data: obj.arrMonth,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            name: obj.label,
            nameLocation: 'end',
            nameTextStyle: {
                color: '#c3d4ff',
                align: 'left',
                fontSize: 14,
                padding: [0, 0, 0, 0]
            },
            splitLine: { //Y轴线的设置
                show: true,
                lineStyle: {
                    color: ['#324b75'],
                    type: 'dashed'
                }
            },
            //nameGap:15,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#c3d4ff',
                    fontSize: 14
                },
                formatter: obj.formatter
            },
            axisLine: { //Y轴线的设置
                show: false,
            },
            splitLine: { //Y轴线的设置
                show: true,
                lineStyle: {
                    color: ['#324b75'],
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            max: obj.max,
            min: '0',
            boundaryGap: ['0%', '0%']
        },
        series: [

            {
                name: '空气优良天气比例',
                data: obj.arrThisYear,
                type: 'line',
                areaStyle: {
                    normal: {}
                },
                smooth: true,
                lineStyle: {
                    //  color:'#00e4ff',
                    width: 2,
                },
                areaStyle: {
                    color: areaBack
                },
                symbol: 'none'

            },

            {
                name: '2017年同期',
                type: 'line',
                stack: '总量',
                areaStyle: {
                    normal: {}
                },
                data: obj.arrLastYear,
                smooth: true,
                lineStyle: {
                    // color:'#f7823c',
                    width: 2,
                },
                areaStyle: {
                    color: areaBack
                },
                symbol: 'none'
            },

        ]
    };
    //如果有目标值，就创建目标数组，并加入到线图的series中
    if (obj.aIndex) {
        var arrIndex = [];
        for (var i = 0; i < 12; i++) {
            arrIndex.push(obj.aIndex);
        }
        var indexsery = {
            name: '考核目标',
            data: arrIndex,
            type: 'line',
            lineStyle: {
                // color:'#72e75e',
                width: 2,
            },
            smooth: true,
            symbol: 'none'
        }
        option.series.push(indexsery);
    }
    return option;
}

/*********popup0   线框图 相关数据对象***** */
//切换弹窗上的线图  优良天数比例和PM2.5年均浓度
$('body').on('click', '.lineGraph', function () {
    $('.lineGraph').removeClass('active');
    $(this).addClass('active');
    if ($(this).attr('data-name') === 'goodWeather') {
        myChart5.setOption(option41);
    } else {
        myChart5.setOption(option42);
    }
})

//切换左列区域的线图  优良天数比例和PM2.5年均浓度  
$('body').on('click', '.WarnTab .NavLi', function () {
    $('.WarnTab .NavLi').removeClass('active');
    $(this).addClass('active');
})