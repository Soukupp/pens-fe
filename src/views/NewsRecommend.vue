<template>
    <h>新闻推荐</h>
    <el-tabs type="border-card" class="result_title result_box">
        <el-tabs-pane label="推荐新闻">
            <el-tabel stripe style="width: 100%">
                <el-table-column label="ID" width="60">

                </el-table-column>
            </el-tabel>
        </el-tabs-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "NewsRecommend"
}
</script>

<style>
.result_title {
    margin-left: 7%;
    margin-top: 1%;
}

.result_box {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}
</style>