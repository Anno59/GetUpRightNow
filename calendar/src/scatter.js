import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/calendar';
import axios from 'axios';

export default class Scatter extends React.Component {

  getDate(){
    axios.get('/api/date.json').then((resolved)=>{
      const chartData = [];
      const data = resolved.data;
      data.map((e) => {
        let date = e+'';
        date = date.slice(0 , 4)
          + '-'
          + date.slice(4 , 6)
          + '-'
          + date.slice(6 , 8);
         chartData.push([date,1])
      });
      this.renderChart(chartData);
    });
  }

  renderChart(data){
    echarts.init(document.getElementById('main')).setOption(
      {
        backgroundColor: '#404a59',
        tooltip : {
          trigger: 'item',
          formatter: function(e){
            return e.data[0]
          }
        },
        calendar: [{
          left: 'center',
          orient: 'vertical',
          range: ['2019-06-01', '2019-12-31'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 4,
              type: 'solid'
            }
          },
          yearLabel: {
            formatter: '{start}',
            textStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: '#323c48',
              borderWidth: 1,
              borderColor: '#111'
            }
          }
        }],
        series : [
          {
            name: 'wake up',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            data: data,
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 20,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      }
    )
  }

  componentDidMount() {
    this.getDate();
  }

  render() {
    return (
      <div>
          <div id="main" style={{width: '100vw', height: '100vh'}}></div>
       </div>
    )
  }
}