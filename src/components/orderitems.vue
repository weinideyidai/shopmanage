<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order' }">订单信息</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table
                    :data="itemlist"
                    style="width: 100%" border   :default-sort = "{prop: 'date', order: 'descending'}">

                <el-table-column
                        type="index"
                        width="50"
                        label="#"
                >

                </el-table-column>
                <el-table-column

                        label="商品名"
                        width="200">
                    <template slot-scope="scope">{{scope.row.goodsVO.name}}</template>
                </el-table-column>
                <el-table-column

                        label="价格"
                        width="200">
                    <template slot-scope="scope">{{scope.row.goodsVO.price}}</template>
                </el-table-column>
                <el-table-column

                        label="图片"
                        width="200">
                    <template slot-scope="scope"><img :src="scope.row.goodsVO.img" style="width: 70px"></template>
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="购买数量"
                        width="200">
                </el-table-column>
                <el-table-column

                        label="商品总数量"
                        width="187">
                    <template slot-scope="scope">{{scope.row.goodsVO.count}}</template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="200">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==1">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>


<script>
    export default {
        data(){
            return { activeName:"",
                addform:{
                    name:"",
                    price:"",
                    img:"",
                    tid:"",
                    bid:"",
                    cid:"",
                    sid:"",
                    count:""
                },
                goodTypelist:[],
                brandlist:[],
                colourlist:[],
                sizelist:[],
                queryInfo:{
                    page:1,
                    rows:5,
                    key:{
                    oid:this.$route.query.id
                    }
                },
                itemlist:[]

            }
        },
        created() {
           this.get()

        },
        methods:{
            async get(){
                const {data:res}= await this.$http.post("orderItems/all",this.queryInfo)
               this.itemlist=res.list
                console.log(this.itemlist)

            }


        }
    }
</script>

<style lang="less" scoped>
    .el-tabs{
        margin-top: 15px;
    }
</style>
