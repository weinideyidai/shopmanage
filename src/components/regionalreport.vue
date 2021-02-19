<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>报表管理</el-breadcrumb-item>
            <el-breadcrumb-item>地区客户报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div id="main" style="width: 700px;height:500px;"></div>
        </el-card>
    </div>
</template>
<script>
    import echarts from "echarts"
    export default {

        data(){
            return {
                list:{ genre:[11,22],sold:["2","4"]},

                genre:{
                    arry:[],
                    arry2:[]
                }
            }
    },
        created() {

        },
        methods:{


        },
     async   mounted() {
            const res  = await  this.$http.post("address/report")
            this.list=res.data
            this.list.forEach(member=>{
                this.genre.arry.push(member.genre)
            })
            this.list.forEach(member=>{
                this.genre.arry2.push(member.sold)
            })
            var myChart = echarts.init(document.getElementById('main'));
            var option = {
                title: {
                    text: ' 用户地区分布·'
                },
                tooltip: {},
                legend: {
                    data:['客户人数']
                },
                xAxis: {
                    data: this.genre.arry
                },
                yAxis: {},
                series: [{
                    name: '客户人数',
                    type: 'bar',
                    data: this.genre.arry2
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
