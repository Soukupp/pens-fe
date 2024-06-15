<template>
    <h style="margin-bottom: 10px">用户兴趣查询</h>
    <el-input class="search-box" v-model="userID"
              placeholder="请输入您想查询的用户的ID" />
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="userID"
                label="用户ID"
                width="300">
        </el-table-column>
        <el-table-column
                prop="timestamp"
                label="时间"
                width="300">
        </el-table-column>
        <el-table-column
                prop="mostPopCategory"
                label="最喜欢的新闻种类"
                width="300">
        </el-table-column>
        <el-table-column
                prop="mostPopClicks"
                label="点击次数">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from "axios";

export default {
    name: "InterestQuery",
    data(){
        return{
            userID:'1',
            tableData:[]
        }
    },
    mounted() {
        console.log("13456",this.tableData);
        this.getInterestList()
    },
    methods:{
        getInterestList(){
            // 获取用户兴趣列表
            axios.get('http://127.0.0.1:4523/m1/4594184-0-default/api/interestQuery',{
                params:{
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
}
</style>