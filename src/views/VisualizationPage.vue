<template>
    <h1>图表展示</h1>
    <div style="display: flex">
        <div id="main" style="width: 70%; height: 500px"></div>
        <div id="pieC" style="width: 30%; height: 500px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, defineProps, onUpdated } from 'vue';
import axios from 'axios';
import { Params } from '../assets/interface';

const option = ref({});
const responseData = ref({
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
});

/** 接收父组件props，使用时直接props.inputData即可，inputData包含需要传给后端的所有数据。父组件修改props自动触发子组件重新渲染 */
const props = defineProps<{
    inputData: Params | undefined
}>();

function getData(){
    // 调用接口，向后端传递参数、获取数据
    axios.get("http://127.0.0.1:4523/m1/4594184-0-default/api/getNewsData",{
        params:{
            props
        }
    }).then(response => {
        response = response.data.response
        console.log("获取新闻数据接口的响应为：",response)

    }).catch(err => {
        console.log("在获取新闻数据使出错："+err)
    })
};

const drawPieChart = () => {
    const pieChart = echarts.init(document.getElementById('pieC') as HTMLElement);
    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
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
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' },
                ],
            },
        ],
    };
    pieChart.setOption(option);
};

const setOptions = () => {
    console.log('111');
    const myChart = echarts.init(document.getElementById('main') as HTMLElement);
    const data = [
        ['2000-06-05', 116],
        ['2000-06-06', 129],
        ['2000-06-07', 135],
        ['2000-06-08', 86],
        ['2000-06-09', 73],
        ['2000-06-10', 85],
        ['2000-06-11', 73],
        ['2000-06-12', 68],
        ['2000-06-13', 92],
        ['2000-06-14', 130],
        ['2000-06-15', 245],
        ['2000-06-16', 139],
        ['2000-06-17', 115],
        ['2000-06-18', 111],
        ['2000-06-19', 309],
        ['2000-06-20', 206],
        ['2000-06-21', 137],
        ['2000-06-22', 128],
        ['2000-06-23', 85],
        ['2000-06-24', 94],
        ['2000-06-25', 71],
        ['2000-06-26', 106],
        ['2000-06-27', 84],
        ['2000-06-28', 93],
        ['2000-06-29', 85],
        ['2000-06-30', 73],
        ['2000-07-01', 83],
        ['2000-07-02', 125],
        ['2000-07-03', 107],
        ['2000-07-04', 82],
        ['2000-07-05', 44],
        ['2000-07-06', 72],
        ['2000-07-07', 106],
        ['2000-07-08', 107],
        ['2000-07-09', 66],
        ['2000-07-10', 91],
        ['2000-07-11', 92],
        ['2000-07-12', 113],
        ['2000-07-13', 107],
        ['2000-07-14', 131],
        ['2000-07-15', 111],
        ['2000-07-16', 64],
        ['2000-07-17', 69],
        ['2000-07-18', 88],
        ['2000-07-19', 77],
        ['2000-07-20', 83],
        ['2000-07-21', 111],
        ['2000-07-22', 57],
        ['2000-07-23', 55],
        ['2000-07-24', 60],
    ];
    const dateList = data.map((item) => item[0]);
    const valueList = data.map((item) => item[1]);
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
                text: 'Gradient along the y axis',
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
        xAxis: [
            {
                data: dateList,
            },
        ],
        yAxis: [{}],
        grid: [
            {
                bottom: '10%',
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
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: valueList,
            },
        ],
    };
    myChart.setOption(option.value);
};

onMounted(() => {
    setOptions();
    drawPieChart();
});

onUpdated(() => {
    console.log('***', props.inputData)
    getData()
});

</script>

<style scoped></style>

