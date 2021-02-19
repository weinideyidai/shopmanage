<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>报表管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">

                <el-col :span="9"> <div class="grid-content bg-purple"> <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.key.username" clearable @clear="getlist">
                    <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
                </el-input>
                </div>
                </el-col>
            </el-row>
                <el-divider></el-divider>
            <div id="main" style="width: 700px;height:500px;"></div>
        </el-card>
    </div>
</template>
<script>
    import echarts from "echarts"
    export default {

        data(){
            return {
                queryInfo:{
                    page:1,
                    rows:5,
                    sortBy:"username",
                    desc:"des",
                    key:{
                        username:"",
                        begin:"",
                        end:"",
                        aid:""
                    }

                }
            }
        },
        created() {
        },
        methods:{
             getlist(){

             }
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('main'));
            var option = {
                dataset: {
                    source: [
                        ['score', 'amount', 'product'],
                        [89.3, 58212, '一月'],
                        [57.1, 78254, '二月'],
                        [74.4, 41032, '三月'],
                        [50.1, 12755, '四月'],
                        [89.7, 20145, '五月'],
                        [68.1, 79146, '六月'],
                        [19.6, 91852, '八月'],
                        [10.6, 101852, '九月'],
                        [32.7, 20112, '十月'],
                        [35.7,33115,'十一月'],
                        [50.7,55115,'十二月']
                    ]

                },
                grid: {containLabel: true},
                xAxis: {name: 'amount'},
                yAxis: {type: 'category'},
                visualMap: {
                    orient: 'horizontal',
                    left: 'center',
                    min: 10,
                    max: 100,
                    text: ['High Score', 'Low Score'],
                    // Map the score column to color
                    dimension: 0,
                    inRange: {
                        color: ['#D7DA8B', '#E15457']
                    }
                },
                series: [
                    {
                        type: 'bar',
                        encode: {
                            // Map the "amount" column to X axis.
                            x: 'amount',
                            // Map the "product" column to Y axis
                            y: 'product'
                        }
                    }
                ]
            };

            myChart.setOption(option);
        }

    }
</script>
<style lang="less" scoped>

    .box-card{
        margin-top: 15px;
    }
</style>
