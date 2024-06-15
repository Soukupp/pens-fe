<template>
    <div style="display: flex">
        <div id="main" style="width: 80%; height: 500px;margin-right: 10px"></div>
        <!-- 添加一个容器用于饼状图 -->
        <div style="width: 20%; height: 400px; position: relative;">
            <!-- 饼状图将在这个容器内 -->
            <div id="pieC" style="height: 400px"></div>
            <!-- 添加文本在饼状图下方 -->
            <div class="pieChartText">
                注：Group与左边图例一致
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, defineProps, onUpdated } from 'vue';
import axios, { AxiosResponse } from 'axios';
import {Params} from '../assets/interface';

const option = ref({});
interface responseData{
    group: [
        {
            newsTheme: 'all',
            titleLength: 'all',
            newsLength: 'all',
            userID: 'all',
            data: [
                {
                    time: '2019-6-13--2019-7-3',
                    hit: 0,
                },
            ],
        },
    ],
};

/** 接收父组件props，使用时直接props.inputData即可，inputData包含需要传给后端的所有数据。父组件修改props自动触发子组件重新渲染 */
const props = defineProps<{
    inputData: Params | undefined
}>();

function getData() {
    // 调用接口，向后端传递参数、获取数据
    axios.get("http://127.0.0.1:4523/m1/4594184-0-default/api/getNewsData", {
        params: {
            props
        }
    }).then(response => {
        const response1 = response.data.response
        console.log("获取新闻数据接口的响应为：", response1)
        console.log("response的类型为：",typeof response1)
        setOptions(response1)
        drawPieChart(response1)
    }).catch(err => {
        console.log("在获取新闻数据使出错：" + err)
    })
};

const drawPieChart = (resData : responseData) => {
    console.log('222',resData);
    const pieChart = echarts.init(document.getElementById('pieC') as HTMLElement);
    if(!resData || !resData.group){
        console.log("resData或resData.group为null！出错默认结束操作")
        return;
    }
    console.log("饼状图1："+resData.group)
    // 准备饼图数据，这里假设每个组别的名称为 'Group' 加上组别的索引
    const seriesData = resData.group.map((group, index) => {
        return {
            name: `Group ${index}`,
            value: group.data.reduce((sum, dataItem) => sum + dataItem.hit, 0)
        };
    });
    console.log("饼状图数据为：" + seriesData.map(item => item.value))

    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
            data:seriesData.map(item => item.name)
        },
        series: [
            {
                name: '新闻点击量',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                //emphasis: {
                //    label: {
                //        show: true,
                 //       fontSize: 40,
                 //       fontWeight: 'bold',
                 //   },
                //},
                labelLine: {
                    show: false,
                },
                data: seriesData,
            },
        ],
    };
    pieChart.setOption(option);
};

const setOptions = (resData : responseData) => {
    console.log('111',resData);
    if(!resData || !resData.group){
        console.log("resData或resData.group为null！出错默认结束操作")
        return;
    }

    // 准备图表数据
    const seriresData = resData.group.map((series) => {
        return{
            name:"主题：" + series.newsTheme + "；标题长度：0-" + series.titleLength + "；内容长度：0-" + series.newsLength + "；用户：" + series.userID ,
            //name: "点击量",
            type:'line',
            emphasis: {
                focus: 'series'
            },
            barWidth: 30,    // 在这里设置柱状图的宽度
            // 以下片段是调整图像颜色用的，可以在需要的时候使用
            //itemStyle:{
            //    color: {
            //        type: 'linearGradient',
            //        x: 0, // 渐变的起始点 x 坐标
            //        y: 0, // 渐变的起始点 y 坐标
            //        x2: 0, // 渐变的结束点 x 坐标
             //       y2: 1, // 渐变的结束点 y 坐标
             //       colorStops: [
             //           {
             //               offset: 0, // 0% 位置的颜色
              //              color: 'rgba(255, 0, 0, 1)' // 开始颜色为红色
              //          },
              //          {
               //             offset: 1, // 100% 位置的颜色
               //             color: 'rgba(0, 255, 0, 1)' // 结束颜色为绿色
               //         }
               //     ]
               // }
            //},
            lineStyle:{
              width:3   // 在这里设置线条粗细
            },
            data:series.data.map(dataItem => [new
            Date(dataItem.time).getTime(),dataItem.hit])
        };
    });
    console.log("seriesData为:",seriresData)

    const myChart = echarts.init(document.getElementById('main') as HTMLElement);
    option.value = {
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400,
            },
        ],
        title: [
            {
                left: 'center',
                text: '新闻点击量图表展示',
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
        legend:{
            top:350,
            itemWidth:40,   // 图例宽度
            //bottom:100,
        },
        xAxis: [
            {
                //data: dateList,
                type:'time',
                data:resData.group.flat().map((item => item.data.map(dataItem => dataItem.time))),
            },
        ],
        yAxis: [{
            type:'value'
        }],
        grid: [
            {
                bottom: '40%',
            },
        ],
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    type: ['line', 'bar'],
                },
            },
        },
        series:seriresData
    };
    myChart.setOption(option.value);
};

onUpdated(() => {
    console.log('***', props.inputData)
    getData()
});

</script>

<style>
.pieChartText{
    position: absolute;
    left: 0px;
    font-size: 14px;
    font-weight: bold;
    color: #dddddd;
    bottom: 0px;
    width: 100%; /* 如果需要，可以让文字宽度充满容器 */
    text-align: center; /* 文字居中显示 */
    margin-top: 0;
    transform: translateY(-10px); /* 如果需要微调，可以修改这个值 */
}
</style>

