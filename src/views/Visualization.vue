<template>
    <h>图表展示</h>
    <div id="main" style="width: 100%;height:500px"></div>
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
    },
    methods:{
        getData(){
            console.log("确认")
            // 先获取数据
            //
        },
        setOptions(){
            console.log("111")
            let myChart = echarts.init(document.getElementById("main"));
            this.option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ],
                toolbox:{
                    show:true,
                    feature:{
                        magicType:{type:['line','bar']}
                    }
                }
            };
            myChart.setOption(this.option)
        }
    }
}
</script>

<style>

</style>