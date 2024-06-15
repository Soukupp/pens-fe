<template>
    <h style="margin-bottom: 10px">用户兴趣查询</h>
    <el-input class="search-box" v-model="userID" @keyup.enter="getInterestList"
              placeholder="请输入您想查询的用户的ID（请注意：用户ID格式为U+数字），按下回车进行查询" />
    <el-table
            :data="tableData"
            stripe
            class="el-table-container"
            >
        <el-table-column
                prop="userID"
                label="用户ID"
                width="180"
                align="center">
        </el-table-column>
        <el-table-column
                prop="timestamp"
                label="时间"
                width="300"
                align="center">
        </el-table-column>
        <el-table-column
                prop="mostPopCategory"
                label="最喜欢的新闻种类"
                width="300"
                align="center">
        </el-table-column>
        <el-table-column
                prop="mostPopClicks"
                label="点击次数"
                width="300"
                align="center">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from "axios";

export default {
    name: "InterestQuery",
    data(){
        return{
            userID:'',
            tableData:[]
        }
    },
    methods:{
        getInterestList(){
            console.log("userID为：",this.userID)
            // 获取用户兴趣列表
            axios.get('http://127.0.0.1:4523/m1/4594184-0-default/api/interestQuery',{
                body:{
                    user_id:this.userID,
                }
            }) .then(response => {
                const response1 =response.data.response;
                console.log("用户兴趣查询接口返回：",response1)
                // 更新tableData
                this.tableData = response1.ClickList.map(item => ({
                    userID: this.userID, // 假设每条记录的userID都是当前用户的ID
                    timestamp: item.timestamp,
                    mostPopCategory: item.mostPopCategory,
                    mostPopClicks: item.mostPopClicks,
                    categoryCounts: item.categoryCounts, // 添加这个属性，如果需要
                }));
                this.userID='';
            }).catch(err => {
                console.log("在进行用户兴趣查询出错：" + err)
            })
        },
    }
}
</script>

<style>
.search-box {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}
.el-table-container {
    width: 100%; /* 或者其他宽度 */
    max-width: 1200px; /* 可选，设置最大宽度 */
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>