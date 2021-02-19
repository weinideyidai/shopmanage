<template>
<div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
   <el-button type="primary" @click="addcate">添加分类</el-button>
        <table-tree :data="catelist"  :columns="columns" show-index :selection-type="false" :expand-type="false" border>
        <template slot="isok" slot-scope="scope">
            <i class="el-icon-success" style="color: green" v-if="scope.row.cat_deleted==false"></i>
            <i class="el-icon-error" style="color: red" v-else></i>
        </template>
            <template slot="paixu" slot-scope="scope">
                <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
                <el-tag v-else-if="scope.row.cat_level==1" type="success">二级</el-tag>
                <el-tag v-else type="warning">三级</el-tag>
            </template>
            <template slot="caozuo" slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="xiugai(scope.row.cat_id)"></el-button>
                <el-button type="danger"  icon="el-icon-delete" size="mini" @click="delet(scope.row.cat_id)"></el-button>
            </template>
        </table-tree>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.queryInfo.pagenum"
                :page-sizes="[5, 10, 15]"
                :page-size="this.queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.Total">
        </el-pagination>
    </el-card>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            @close="dialogVisibleclose"
           >
        <el-form ref="formref" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="form.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <el-cascader
                        v-model="value"
                        :options="parentlist"
                        @change="handleChange"
                        :props="{value:'cat_id', label:'cat_name', children:'children'}"
                        clearable
                        change-on-select
                >
                </el-cascader>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=" yestoadd">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
            title="提示"
            :visible.sync="xgyhdialogVisible"
            width="30%"

           >
        <el-form ref="xgyhformref" :model="xiugailist" label-width="80px" >
            <el-form-item label="分类名称" >
                <el-input v-model="xiugailist.cat_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="xgyhdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="qdxg">确 定</el-button>
  </span>
    </el-dialog>
</div>
</template>
<script>
    export default {
        data(){
            return{
                queryInfo: {
                    pagenum: 1,
                    pagesize:5
                },
                Total:0,
                catelist:[],
                columns:[
                    {
                    label:"分类名称",
                      prop:"cat_name"
                },
                    {
                        label:"是否有效",
                        type:"template",
                        template:"isok"
                    },
                    {
                        label:"排序",
                        type:"template",
                        template:"paixu"
                    },
                    {
                        label:"操作",
                        type:"template",
                        template:"caozuo"
                    }
                ],
                dialogVisible:false,
                form:{
                    cat_name:"",
                    cat_pid:0,
                    cat_level:2
                },
                rules:{
                    name:[

                    ]
                },
                parentlist:[],
                value:[],
               props:{
                    value:"cat_id",
                     label:"cat_name",
                   children:"children"
               },
                xiugailist:{},
                xgyhdialogVisible:false,
            }
        },
        created() {
            this.getcatelist()
        },
        methods:{
          async  getcatelist(){
              const {data:res}= await    this.$http.get("categories",{params:this.queryInfo})
              if (res.meta.status!=200) return this.$message.error("获取失败")
               this.$message.success("获取数据成功")
              console.log(res)
              this.catelist=res.data.result
              this.Total=res.data.total
            },
            handleSizeChange(v1){
              console.log(v1)
                this.queryInfo.pagesize=v1
                this.getcatelist()
            },
            handleCurrentChange(v1){
              this.queryInfo.pagenum=v1
                this.getcatelist()
            },
            addcate(){
              this.getparentlist()

                this.dialogVisible=true
            },
            //获取父级分类列表
           async getparentlist(){
              const {data:res}= await  this.$http.get("categories",{params:{type:2}})
               this.parentlist=res.data
               console.log(res.data)
            },
            handleChange(){
              if (this.value.length>0){
               this.form.cat_pid=this.value[this.value.length-1]
                this.form.cat_level=this.value.length
              }
              },
           async yestoadd(){

                const {data:res}=  await  this.$http.post("categories",this.form)
               console.log(res)
              if (res.meta.status!=201){
                  return this.$message.error("添加失败")}
               this.$message.success("添加成功")
               this.getcatelist()
            },
            dialogVisibleclose(){
              this.value=[]
                this.form.cat_name=""
            },
           async xiugai(v1){
          const {data:res}= await this.$http.get("categories/"+v1)
               console.log(res)
               this.xiugailist=res.data
              this.xgyhdialogVisible=true
            },
           async qdxg(){
     const {data:res}= await   this.$http.put("categories/"+this.xiugailist.cat_id,{cat_name:this.xiugailist.cat_name})
             if (res.meta.status!==200) return this.$message.error("更新失败")
             this.$message.success("更新成功")
             this.getcatelist()
               this.xgyhdialogVisible=false
            },
           async delet(v1){
                const  msg=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err =>err)
                if (msg!=="confirm") {
                    return this.$message.info("取消了删除操作")
                }
               const {data:res}= await this.$http.delete("categories/"+v1)
               if (res.meta.status!==200) return this.$message.error("删除失败")
               this.$message.success("删除成功")
               this.getcatelist()
            }
        }
    }
</script>

<style>
.box-card{
    margin-top: 15px;
}


</style>
