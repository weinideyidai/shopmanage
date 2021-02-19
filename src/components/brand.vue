<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>品牌信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">

            <el-row :gutter="20">

                <el-col :span="9"> <div class="grid-content bg-purple"> <el-input placeholder="请输入品牌名"  class="input-with-select" v-model="queryInfo.key.name" clearable @clear="getlist">
                    <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
                </el-input></div></el-col>

            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="2">
                <el-button type="danger" size="mini" @click="plsc">批量禁用</el-button>
                </el-col>
                <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="dialogVisible=true" size="mini">添加品牌</el-button></div></el-col>
            </el-row>
            <el-table
                    :data="userlist"
                    style="width: 100%" border  @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="100">
                </el-table-column>
                <el-table-column
                        type="index"
                        width="100"
                        label="#"
                >

                </el-table-column>
                <el-table-column
                        prop="name"
                        label="品牌"
                        width="180">
                </el-table-column>

                <el-table-column
                        label="图片"
                        width="220">
                    <template slot-scope="scop"><img :src="scop.row.img" style="height: 50px"></template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="180">
                    <template slot-scope="scop">
                        <el-tag v-if="scop.row.status==1">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop=""
                        label="操作"
                        width="435">
                    <template slot-scope="scop">
                        <el-button type="primary"  size="mini" @click="xgyhxx(scop.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteuser(scop.row.id)">禁用</el-button>
                        <el-button type="success" size="mini" @click="star(scop.row.id)">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.page"
                    :page-sizes="[1, 5, 8, 10]"
                    :page-size="queryInfo.rows"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <el-dialog
                title="添加品牌"
                :visible.sync="dialogVisible"
                width="50%"
                @close="dialogVisibleclose">
            <el-form label-width="80px" :model="addform" :rules="bb" ref="addformref">
                <el-form-item label="商品名" prop="name">
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">

                    <div>
                        <input  type="file" accept="image/*" ref='input' class="input" >
                        <button @click="publish">上传</button>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="adduser">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                title="输入需修改信息"
                :visible.sync="userVisible"
                width="30%"
                @close="xhyhclose"
        >
            <el-form label-width="80px" :model="xgyh" :rules="xgyhformrules" ref="xgyhformref">
                <el-form-item label="商品名" prop="name" >
                    <el-input v-model="xgyh.name" ></el-input>
                </el-form-item>
                <el-form-item label="商品图片">

                    <div>
                        <input  type="file" accept="image/*" ref='input' class="input" >
                        <button @click="publish1">上传</button>
                    </div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="userVisible = false">取 消</el-button>
    <el-button type="primary" @click="xguser">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>
<script>
    export  default {
        data(){
            return{
                dialogVisible:false,
                queryInfo:{
                    page:1,
                    rows:5,

                    key:{
                        name:""
                    }
                },
                addform:{
                    name:"",
                    img:""
                },
                bb:{
                    name:[ { required: true, message: '请输入商品名称', trigger: 'blur' } ]
                },
                userlist:[],
                total:0,
                userVisible:false,
                xgyh:{},
                xgyhformrules:{
                    name:[{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                    mobile:[{ required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '输入合法手机号', trigger: 'blur' }]
                },
                setroledialogVisible:false,
                roleinfo:{},
                rolelist:{},
                rolevalue:'',
                multipleSelection: [],
                newarr:[],
                value:"",
            }
        },
        created() {
            this.getlist()
        },
        methods:{
            async getlist(){
                const {data:res}=  await this.$http.post("brands/all",this.queryInfo)
                // if(res.meta.status!==200) return  this.$message.error("获取失败")
                this.$message.success("获取商品数据成功")
                console.log(res)
                this.userlist=res.list
                this.total=res.total
            },
            dialogVisibleclose(){
                this.$refs.addformref.resetFields()
                this.addform.name=""
            },
            adduser(){
                this.$refs.addformref.validate(async valid=> {
                    if (!valid) return  this.$message.error("请填写必填内容")
                    const res = await this.$http.post("brands/save", this.addform)
                    console.log(res)
                    this.getlist()

                    this.$message.success("添加成功")
                    this.dialogVisible = false
                })

            },
            handleSizeChange(v1){
                this.queryInfo.rows=v1
                this.getlist()
            },
            handleCurrentChange(v1){
                this.queryInfo.page=v1
                this.getlist()
            },

            async  xgyhxx(v1){

                const res=   await   this.$http.get("brands/find/"+v1)
                this.xgyh=res.data
                console.log(this.xgyh)
                console.log(res)
                this.userVisible=true
            },
            xhyhclose(){
                this.$refs.xgyhformref.resetFields()
                this.xgyh={}
            },
            async  xguser(){
                this.$refs.xgyhformref.validate(async valid=> {
                    if (!valid) return  this.$message.error("请填写必填内容")
                    const res = await this.$http.post("brands/updateBrands", {
                        id: this.xgyh.id,
                        name: this.xgyh.name,
                        img: this.xgyh.img
                    })
                    this.userVisible = false
                    console.log(this.value)
                    this.$message.success("修改数据成功")
                    this.getlist()
                })
            },
            async deleteuser(v1){
                const  msg=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err =>err)
                if (msg!=="confirm") {
                    return this.$message.info("取消了删除操作")
                }
                const res= await this.$http.post(`brands/updateStateId/${v1}/0`)
                console.log(res)
                //if (res.meta.status!==200) return this.$message.error("删除失败")
                this.$message.success("删除成功")
                this.getlist()
            },
            async star(v1){
                const res= await this.$http.post(`brands/updateStateId/${v1}/1`)
                console.log(res)
                //if (res.meta.status!==200) return this.$message.error("删除失败")
                this.$message.success("启用成功")
                this.getlist()
            },
            handleSelectionChange(v1){
                this.multipleSelection=v1
            },
            async   plsc(){
                console.log(this.multipleSelection)
                if (this.multipleSelection.length==0) {return this.$message.error("请选择需要删除的数据")}
                const  msg=await this.$confirm('此操作将永久禁用该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err =>err)
                if (msg!=="confirm") {


                    return this.$message.info("取消了禁用操作")

                }
                this.multipleSelection.forEach(member=>{
                    this.newarr.push(member.id)
                })
                const res=await  this.$http.post("brands/updateStateIds",this.newarr)
                this.getlist()
            },
            handleRemove(file, fileList) {
               // console.log(file, fileList);
            },
            handlePreview(file) {
                //console.log(file);
            },
            bu(file){
               this.file=file

            },
            submit(){
                var fd = new FormData();
                fd.append("uploadfile",this.file)
                console.log(this.file)
                this.$http.post("upload",fd,{ headers: { "Content-Type": "multipart/form-data" } })

            },
          async  publish(){
                let ip = this.$refs.input;
                let formdata = new FormData()
                formdata.append("uploadfile", ip.files[0]);
                //上传的照片如果想要在页面中显示
                //html中创建一个img标签 ref设置为img
                //let img = this.$refs.img
                //const reader = new FileReader()
                //reader.readAsDataURL(ip.files[0])
                //reader.οnlοad=function(e){
              const res= await this.$http
                    .post("http://120.24.27.228:8080/upload", formdata, {
                        headers: { "Content-Type": "multipart/form-data" }
                    })
              this.$message.success("上传成功")
              this.addform.img=res.data

            },
            async  publish1(){
                let ip = this.$refs.input;
                let formdata = new FormData()
                formdata.append("uploadfile", ip.files[0]);
                //上传的照片如果想要在页面中显示
                //html中创建一个img标签 ref设置为img
                //let img = this.$refs.img
                //const reader = new FileReader()
                //reader.readAsDataURL(ip.files[0])
                //reader.οnlοad=function(e){
                const res= await this.$http
                    .post("http://localhost:8080/upload", formdata, {
                        headers: { "Content-Type": "multipart/form-data" }
                    })
                this.$message.success("上传成功")
                this.xgyh.img=res.data

            }
        }

    }
</script>
<style lang="less" scoped>
    .box-card{
        margin-top: 15px;
    }
    .el-table{
        margin-top: 15px;
        font-size: 12px;
    }
</style>
