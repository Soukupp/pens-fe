<template>
    <div class="card-container">
        <div class="container">
            <div ref="containerRef">
                <div v-for="(group, index1) in dataGroup" :key="index1" class="group-container">
                    <span>{{ '对照组' + (index1 + 1) }}</span>
                    <div v-for="(value, index2) in group.sortValues" :key="index2" class="select-container">
                        <el-select v-model="group.sortValues[index2].type" placeholder="请选择指标" @change="updateOptions(index1)">
                            <el-option v-for="option in getAvailableOptions(index1, index2)" :key="option.value" :label="option.text" :value="option.value"></el-option>
                        </el-select>
                        <el-select v-model="group.sortValues[index2].value" placeholder="请选择值" :disabled="!group.sortValues[index2].type">
                            <el-option v-for="option in getSecondOptions(group.sortValues[index2].type)" :key="option" :label="option" :value="option"></el-option>
                        </el-select>
                    </div>
                    <button @click="addSort(index1)" :disabled="group.sortValues.length >= 4" class="new-sort-button">+ 新增指标</button>
                </div>
                <el-button @click="addGroup">新增对照组</el-button>
                <el-button @click="Visualization.methods.getData()">确认</el-button>
            </div>
        </div>
        <div class="container">
            <Visualization />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Visualization from "./Visualization.vue"

// 初始选项数据
const sortType = [
    { value: 'user_ID', text: '用户ID' },
    { value: 'news_length', text: '新闻内容长度' },
    { value: 'title_length', text: '新闻标题长度' },
    { value: 'news_theme', text: '新闻类型' }
];

const optionData = [
    { option: 'user_ID', data: [101, 202, 303] },
    { option: 'news_length', data: [1000, 2000, 3000] },
    { option: 'title_length', data: [10, 20, 30] },
    { option: 'news_theme', data: ['体育类', '政治类', '生活类'] }
];

interface SortValue {
    type: string;
    value: any;
}

interface Group {
    sortValues: SortValue[];
}

// 初始化数据
const dataGroup = reactive<Array<Group>>([{ sortValues: [{ type: '', value: null }] }]);

// 处理添加新对照组的函数
const addGroup = () => {
    dataGroup.push({ sortValues: [{ type: '', value: null }] });
};

// 处理添加新指标的函数
const addSort = (groupIndex: number) => {
    if (dataGroup[groupIndex].sortValues.length < 4) {
        dataGroup[groupIndex].sortValues.push({ type: '', value: null });
    }
};

// 获取可用的选项，排除已经选择的指标
const getAvailableOptions = (groupIndex: number, sortIndex: number) => {
    const selectedValues = dataGroup[groupIndex].sortValues.map(sortValue => sortValue.type).filter((_, index) => index !== sortIndex);
    return sortType.filter(option => !selectedValues.includes(option.value));
};

// 获取第二个 select 的选项
const getSecondOptions = (type: string) => {
    const selectedOption = optionData.find(option => option.option === type);
    return selectedOption ? selectedOption.data : [];
};

// 触发 Vue 的响应式机制更新可用选项
const updateOptions = (groupIndex: number) => {
    dataGroup[groupIndex].sortValues.push(dataGroup[groupIndex].sortValues.pop() as SortValue);
};
</script>

<style scoped>
.card-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.group-container {
    margin-bottom: 20px;
}

.select-container{
    margin-top: 10px;
    margin-bottom:10px;
    display: flex;
    gap:10px;
}

.new-sort-button{
    border-radius: 10px;
    padding: 5px 10px;
    font-size:11px;
    background-color: #f6f8fa;
    color:rgb(100, 100, 100);
    border-width: 0;
}

.new-sort-button:hover{
    background-color: #d9d9d9;
    cursor: pointer;
    transition: 300ms;
}

select {
    margin-bottom: 10px;
}
</style>