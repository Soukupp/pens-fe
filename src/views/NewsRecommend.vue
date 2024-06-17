<template>
    <h class="viewTitle tracking-in-expand">新闻推荐</h>
    <div class="query-container"> 
        <el-input v-model="userID" @keyup.enter="handleClickEvent" placeholder="请输入您想查询的用户的ID（请注意：用户ID格式为U+数字），按下回车进行查询"></el-input>
        <el-button @click="handleClickEvent" placeholder="请输入您想查询的用户的ID（请注意：用户ID格式为U+数字），按下回车进行查询">查询</el-button>
    </div>
    <el-table :data="formData" :header-cell-style="{ 'text-align': 'center' } ">
        <el-table-column prop="newsID" label="新闻ID" width="180" align="center" />
        <el-table-column prop="headlineLen" label="新闻标题" width="180" align="center" />
        <el-table-column prop="category" label="新闻主题" align="center" />
        <el-table-column prop="newsBodyLen" label="新闻长度" align="center" />
        
    </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
import { ElMessage } from 'element-plus';


const userID = ref('');
const formData = ref(null);

const handleClickEvent = () => {
    axios.get('http://localhost:8001/api/recommendNews', {
        params: {
            user_id: userID.value,
        }
    }).then((res) => {
        const data = res.data;
        formData.value = data.response.recommendList;
        console.log(formData.value)
    }).catch((err) => {
        ElMessage({
            type: 'error',
            message: err
        })
    })
}

</script>

<style scoped>
.viewTitle {
    background-image: linear-gradient(96.14deg,
            rgba(24, 103, 154, 0.69) 0%,
            #0093bf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left;

    font: 600 20px "Poppins", sans-serif;
}

.tracking-in-expand {
    -webkit-animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

.query-container{
    display: flex;
    flex-direction: row;
    width: 50%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    gap: 20px;
}
</style>