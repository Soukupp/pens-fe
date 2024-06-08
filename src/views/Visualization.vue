<template>
    <h>图表展示</h>
    <div style="display: flex">
        <div id="main" style="width: 70%;height: 500px"></div>
        <div id="pieC" style="width: 30%;height: 500px"></div>
    </div>

</template>

<script>
import * as echarts from 'echarts';
import ECharts from 'vue-echarts';
import {ref} from "vue";
import axios from "axios";

export default {
    name: "Visualization.Vue",
    components:{
        ECharts
    },
    data(){
        return{
            option:null,
            responseData:{
                group:[
                    {
                        newsTheme:"all",
                        titleLength:"all",
                        newsLength:"all",
                        userID:"all",
                        data:[
                            {
                                time:"2019-6-13--2019-7-3",
                                hit: 0
                            }
                        ]
                    }
                ]
            }
        }
    },
    mounted() {
        this.setOptions()
        this.drawPieChart()
    },
    methods:{
        getData(){
            console.log("确认")
            // 先获取数据
            //
        },
        drawPieChart(){
          let PieChart = echarts.init((document.getElementById("pieC")));
          let option = {
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  top: '5%',
                  left: 'center'
              },
              series: [
                  {
                      name: 'Access From',
                      type: 'pie',
                      radius: ['40%', '70%'],
                      avoidLabelOverlap: false,
                      itemStyle: {
                          borderRadius: 10,
                          borderColor: '#fff',
                          borderWidth: 2
                      },
                      label: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          label: {
                              show: true,
                              fontSize: 40,
                              fontWeight: 'bold'
                          }
                      },
                      labelLine: {
                          show: false
                      },
                      data: [
                          { value: 1048, name: 'Search Engine' },
                          { value: 735, name: 'Direct' },
                          { value: 580, name: 'Email' },
                          { value: 484, name: 'Union Ads' },
                          { value: 300, name: 'Video Ads' }
                      ]
                  }
              ]
          };
          PieChart.setOption(option)
        },
        setOptions(){
            console.log("111")
            let myChart = echarts.init(document.getElementById("main"));
            // prettier-ignore
            const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
            const dateList = data.map(function (item) {
                return item[0];
            });
            const valueList = data.map(function (item) {
                return item[1];
            });
            this.option = {
                // Make gradient line here
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    },
                ],
                title: [
                    {
                        left: 'center',
                        text: 'Gradient along the y axis'
                    },
                ],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        data: dateList
                    },
                ],
                yAxis: [
                    {},
                ],
                grid: [
                    {
                        bottom: '10%'
                    },
                ],
                toolbox:{
                    show:true,
                    feature:{
                        magicType:{
                            type:['line','bar'],
                        }
                    }
                },
                series: [
                    {
                        type: 'line',
                        showSymbol: false,
                        data: valueList
                    },
                ]
            };
            myChart.setOption(this.option)
        },

    }
}
</script>

<style>

</style>