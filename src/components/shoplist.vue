<template>
   <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
   </el-breadcrumb>
      <el-card class="box-card">
        <el-row :gutter="24">
           <el-col :span="9"><div><el-input v-model="queryinfo.query" placeholder="请输入内容" clearable @clear="getgoodlist"> <el-button slot="append" icon="el-icon-search" @click="getgoodlist" ></el-button></el-input></div></el-col>
           <el-col :span="6"> <div class="grid-content bg-purple"><el-button type="primary" @click="addgoods">添加商品</el-button></div></el-col>
        </el-row>
         <el-table
                 :data="goodslist"
                 style="width: 100%"
         border>
            <el-table-column
                    type="index"
                    label="#"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="goods_name"
                    label="商品名称"
                    width="480">
            </el-table-column>
            <el-table-column
                    prop="goods_price"
                    label="商品价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="goods_weight"
                    label="商品重量"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="add_time"
                    label="创建时间"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="250">
               <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
               </template>
            </el-table-column>
         </el-table>
         <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="queryinfo.pagenum"
                 :page-sizes="[8, 10, 15, 20]"
                 :page-size="queryinfo.pagesize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
         </el-pagination>
      </el-card>

   </div>
</template>

<script>
export default {
   data(){
      return {
         queryinfo:{
            query:"",
            pagenum:1,
            pagesize:5
         },
         total:0,
         goodslist:[]

      }
   },
   created() {
      this.getgoodlist()
   },
   methods:{
     async getgoodlist(){
     const {data:res}=  await this.$http.get("goods",{params:this.queryinfo})
        console.log(res)
        this.goodslist=res.data.goods
        this.total=res.data.total
      },
      handleSizeChange(v1){

        this.queryinfo.pagesize=v1
         this.getgoodlist()
      },
      handleCurrentChange(v1){
         this.queryinfo.pagenum=v1
         this.getgoodlist()

      },
      addgoods(){
        this.$router.push("/goods/add")
      }

   }

}
</script>
<style lang="less" scoped>

</style>
