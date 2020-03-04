import React, { Component} from 'react';
import Link from 'umi/link'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const data = [
  { 'dszyk': '0.0', 'week': '2019-15' }, { 'dszyk': '0.0', 'week': '2019-16' }, {
    'dszyk': '0.0',
    'week': '2019-17',
  }, { 'dszyk': '0.0', 'week': '2019-18' }, { 'dszyk': '0.0', 'week': '2019-19' }, {
    'dszyk': '-312800.0',
    'week': '2019-20',
  }, { 'dszyk': '936100.0', 'week': '2019-21' }, { 'dszyk': '776300.0', 'week': '2019-22' }, {
    'dszyk': '-64200.0',
    'week': '2019-23',
  }, { 'dszyk': '220200.0', 'week': '2019-24' }, { 'dszyk': '-852500.0', 'week': '2019-25' }, {
    'dszyk': '-208800.0',
    'week': '2019-26',
  }, { 'dszyk': '460500.0', 'week': '2019-27' }, { 'dszyk': '-793500.0', 'week': '2019-28' }];
const ssl_data = [
  { 'ssl': '0.0', 'lx': '日内' }, { 'ssl': '0.0', 'lx': '短线' }, { 'ssl': '100.0', 'lx': '中线' }, {
    'ssl': '100.0',
    'lx': '长线',
  }, { 'ssl': '0.0', 'lx': '超长线' }, { 'ssl': '100.0', 'lx': '整体' }];
const pzyk_data = [{ 'zyk': '-209900.0', 'hypz': '中质含硫原油' }];

class Greeter extends Component {
  componentDidMount() {
    this._mzyk(data);
    this._sslqk(ssl_data);
    this._pzyk(pzyk_data);
  }

  _mzyk = (data) => {
    let xAxisData = [];
    let yAxisData = [];
    let unit={value:1,unit:'元'}
    for (let i = 0; i < data.length; i++) {
      if(Math.abs(data[i].dszyk)>10000){
        unit={value:10000,unit:'万元'};
        break;
      }
    }
    for (let i = 0; i < data.length; i++) {
      xAxisData.push(data[i].week);
      yAxisData.push(data[i].dszyk / unit.value);
    }
    let itemStyle = {
      normal: {

        color: function(params) {
          var colorList = ['#2EC7C9', '#B6A2DE'];
          if (params.data > 0) {
            return colorList[0];
          } else {
            return colorList[1];
          }

        },
      },
      emphasis: {
        barBorderRadius: 30,
      },
    };
    let option = {

      backgroundColor: 'white',
      color: ['#eb424a','#40b340','#fad400'],
      legend: {
        x: 'right',
        y: 'top',
        data: ['单日盈利', '单日亏损','单日手续费']
      },
      title: {
        text: '单日<br/>盈亏',

        textStyle:{
          color:'#000',
          fontSize:'15'
        },
        x: 'center',
        y: 'top'
      },
      tooltip: {
        trigger: 'axis',

        formatter: function(data) {
          var obj = eval(data[0]);
          var str = data[0].name;
          str += '</br>周盈亏：' + obj.value * unit.value + '元';

          return str;
        },
      },

      grid: {
        y: '50',
      },

      dataZoom: {
        show: true,
        realtime: true,

        width: 20,
        start: 0,
        end: 100,
        orient: 'vertical',
      },
      calculable: true,
      xAxis: [
        {
          name: unit.unit,
          type: 'value',

        },
      ],
      yAxis: [
        {

          type: 'category',

          data: xAxisData,

        },
      ],
      series: [
        {
          name: '周收益率(正值)',
          type: 'bar',
          barMaxWidth: 30,
          itemStyle: itemStyle,
          data: yAxisData,
        },
      ],
    };
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption(option);
  };
  _sslqk = (data) => {
    let xAxisData = [];
    let yAxisData = [];
    for (let i = 0; i < data.length; i++) {
      xAxisData.push(data[i].lx);
      yAxisData.push(data[i].ssl);

    }
    var chart7 = echarts.init(document.getElementById('charts1'));

    var itemStyle = {
      normal: {
        color: function(params) {
          //首先定义一个数组
          var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589'];
          return colorList[params.dataIndex];
        },
      },
      emphasis: {

        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)',
      },
    };
    var option = {

      backgroundColor: 'white',

      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
        },
      },

      grid: {
        y: '50',
      },

      calculable: true,
      yAxis: [
        {
          name: '%',
          type: 'value',

        },
      ],
      xAxis: [
        {

          type: 'category',
          boundaryGap: true,
          data: xAxisData,
          axisLabel: {
            interval: 0,
            formatter:function(value)
            {
              return value.split("").join("\n");
            }
          }
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          stack: 'one',
          barMaxWidth: 30,
          itemStyle: itemStyle,
          data: yAxisData,
        },
      ],
    };

    chart7.setOption(option);
  };
  _pzyk = (data) => {
    var xAxisData = [];
    var yAxisData = [];
    for(var i=0;i<data.length;i++){
      xAxisData.push(data[i].hypz);
      yAxisData.push(data[i].zyk);

    }
    var itemStyle = {
      normal: {

        color: function(params) {
          var colorList = ['#2EC7C9', '#B6A2DE' ];
          if (params.data >0) {
            return colorList[0];
          } else {
            return colorList[1];
          }

        }
      },
      emphasis: {
        barBorderRadius: 30
      }
    }
    var chart9 = echarts.init(document.getElementById('charts2'));


    var option = {

      backgroundColor:'white',

      tooltip : {
        trigger: 'axis',
      },

      grid:{
        y:'50'
      },

      dataZoom : {
        show : true,
        realtime : true,

        width: 20,
        start : 0,
        end : 100,
        orient :'vertical'
      },
      calculable : true,
      xAxis : [
        {
          name : '元',
          type : 'value',
          splitNumber:2

        }
      ],
      yAxis : [
        {

          type : 'category',

          data : xAxisData

        }
      ],
      series: [
        {
          name: ' ',
          type: 'bar',
          barMaxWidth :30,
          itemStyle: itemStyle,
          data: yAxisData
        }
      ]
    };

    chart9.setOption(option);
  };

  // 绘制图表
  render() {
    return (
      <div>
        <Link to={"/user"}>go to /users</Link>
        <div id="main" style={{ width: 300, height: 300 }}/>
        <div style={{ height: '15rem', width: '15rem' }}>
          <div id="charts1" style={{ height: '15rem', width: '15rem' }}/>
        </div>
        <div id="charts2" style={{ marginLeft:20,height: '15rem', width: '15rem' }}/>
      </div>
    );
  }
}

export default Greeter;
