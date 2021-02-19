<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>报表管理</el-breadcrumb-item>
            <el-breadcrumb-item>地区客户报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div id="main" style="width: 800px;height:500px;"></div>
        </el-card>
    </div>
</template>
<script>
    import echarts from "echarts"
    export default {

        data(){
            return {}
        },
        created() {
        },
        methods:{

        },
        mounted() {
            var myChart = echarts.init(document.getElementById('main'));
          var  option = {
                xAxis: {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320,1100,1500,1000,1100,1200],
                    type: 'line'
                }]
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
