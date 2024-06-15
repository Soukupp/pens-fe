<template>
    <h style="margin-bottom: 10px">用户兴趣查询</h>
    <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="自定义验证" prop ="userID">
            <el-input  v-model="form.userID" placeholder="请输入用户ID">
            </el-input>
        </el-form-item>
    </el-form>
    <el-input class="search-box" v-model="userID" :validate-event="validateEvent"
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
export default {
    name: "InterestQuery",
    data(){
        return{
            form:{
                userID:'',
            },
            rules:{
                userID:[
                    {
                        validator:(rule,value,callback) => {
                            if(value && !value.startWith('U')){
                                callback(new error('用户ID以U开头！'));
                            }else{
                                callback();
                            }
                        },
                        trigger:'blur'
                    }
                ]
            },
            formRef:null,
            validateEvent: 'input', // 这里设置为 'input' 表示输入时触发验证
            tableData:[{
                userID:'12',
                timestamp:'2016-05-02',
                mostPopCategory:'sports',
                mostPopClicks:'20',
            }, {
                userID:'12',
                timestamp:'2016-05-02',
                mostPopCategory:'music',
                mostPopClicks:'25',
            }, {
                userID:'12',
                timestamp:'2016-05-02',
                mostPopCategory:'finance',
                mostPopClicks:'30',
            }, {
                userID:'12',
                timestamp:'2016-05-02',
                mostPopCategory:'news',
                mostPopClicks:'15',
            }]
        }
    },
    mounted() {
        console.log("13456",this.tableData);
        this.formRef = this.$refs.formRef;
    },
    methods:{
        submitForm(){
            this.formRef.validate((valid) => {
                if (valid) {
                    alert('表单验证成功!');
                } else {
                    alert('表单验证失败!');
                }
            });
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