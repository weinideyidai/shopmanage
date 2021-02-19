<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>日志信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">

                <el-col :span="6"> <div class="grid-content bg-purple"> <el-input placeholder="请输入姓名"  class="input-with-select" v-model="queryInfo.key.username" clearable @clear="getlist">

                </el-input>
                </div></el-col>
                <el-col :span="9">
                    <el-date-picker
                        v-model="value1"
                        type="daterange"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                </el-col>
                <el-col :span="2"> <el-button type="primary" @click="getlist">提交</el-button></el-col>

            </el-row>
            <el-divider></el-divider>

            <el-button type="danger" size="mini" @click="pljy">批量禁用</el-button>
            <el-table
                    :data="userlist"
                    style="width: 100%" border  @selection-change="handleSelectionChange" :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                        type="selection"
                        width="80">
                </el-table-column>
                <el-table-column
                        type="index"
                        width="100"
                        label="#"
                >

                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="visitTime"
                        label="观看时间"
                        width="180"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="ip"
                        label="ip"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="url"
                        label="操作"
                        width="200">

                </el-table-column>

                <el-table-column
                        prop=""
                        label="操作"
                        width="290">
                    <template slot-scope="scop">

                        <el-button type="danger"   icon="el-icon-delete"  size="mini" @click="deleteuser(scop.row.id)"></el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.page"
                    :page-sizes="[ 3,5,8,10]"
                    :page-size="queryInfo.rows"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>



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
                        username:"",
                        begin:"",
                        end:""
                    }
                },
                addform:{
                    username:"",
                    password:"",
                    phone:"",
                    aid:1
                },
                addformrules:{
                    username:[ { required: true, message: '请输入账号名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[{ required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }],
                    phone:[ { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '电话号码不合法', trigger: 'blur' }
                    ]
                },
                userlist:[],
                total:0,
                userVisible:false,
                xgyh:{},
                xgyhformrules:{
                    username:[ { required: true, message: '请输入用户名称', trigger: 'blur' }
                    ]
                },
                setroledialogVisible:false,
                roleinfo:{},
                rolelist:{},
                rolevalue:'',
                multipleSelection: [],
                value1: "",
                newArrs:[],
                chakan:{},
                addresslist:[],
                addresslist2:[],
                subminxgxx:{
                    id:"",
                    username:"",
                    phone:"",
                    aid:1
                },
                quanxianid:""

            }
        },
        created() {
            this.getlist()
        },
        methods:{
            async getlist(){

                if (this.value1!=""&&this.value1!=null){
                    this.queryInfo.key.begin=this.value1[0]
                    this.queryInfo.key.end=this.value1[1]
                }else {
                    this.queryInfo.key.begin=""
                    this.queryInfo.key.end=""
                }
                const {data:res}=  await this.$http.post("log/all",this.queryInfo)
                // if(res.meta.status!==200) return  this.$message.error("获取失败")
                this.$message.success("获取用户数据成功")
                //console.log(res)thi
                //this.queryInfo.key.begin=""
                // this.queryInfo.key.end=""
                this.userlist=res.list
                this.total=res.total

            },
            dialogVisibleclose(){
                this.$refs.addformref.resetFields()
            },
            adduser(){
                this.$refs.addformref.validate(async valid=>{
                    if (!valid) return
                    const res    =await this.$http.post("user/save",this.addform)
                    console.log(res)
                    this.getlist()
                    // if (res.meta.status!==201)  return this.$message.error("添加失败")
                    this.$message.success("添加成功")
                    this.dialogVisible=false
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
                const res=   await   this.$http.get("user/find/"+v1)
                this.xgyh=res.data
                console.log(this.xgyh)
                const res1= await this.$http.post("address/findAll")
                console.log(res1)
                this.addresslist=res1.data
                console.log(this.addresslist)
                this.userVisible=true
            },
            xhyhclose(){
                this.$refs.xgyhformref.resetFields()
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
                const res= await this.$http.post("log/deleteId/"+v1)
                console.log(res)
                //if (res.meta.status!==200) return this.$message.error("删除失败")
                this.$message.success("操作成功")
                this.getlist()
            },
            handleSelectionChange(v1){
                this.multipleSelection=v1
            },
            async start(v1){
                const res= await this.$http.post(`user/updateStateId/${v1}/1`)
                this.$message.success("启用成功")
                console.log(res)
                this.getlist()
            },
            async  pljy(){
                if (this.multipleSelection.length==0) {return this.$message.error("请选择需要删除的数据")}
                this.multipleSelection.forEach(member=>{
                    this.newArrs.push(member.id)
                })
                const  msg=await this.$confirm('此操作将永久批量删除这些文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err =>err)
                if (msg!=="confirm") {
                    this.multipleSelection=[]
                    this.newArrs=[]
                    return this.$message.info("取消了删除操作")

                }
                const res =await this.$http.post("log/deleteIds",this.newArrs)
                this.$message.success("批量删除成功")
                console.log(res)
                this.multipleSelection=[]
                this.newArrs=[]
                this.getlist()
            },
            async xgyes(){
                this.subminxgxx.id=this.xgyh.id
                this.subminxgxx.username=this.xgyh.username
                this.subminxgxx.phone=this.xgyh.phone
                this.subminxgxx.aid=this.xgyh.aid
                const res = await this.$http.post("user/updateUser/"+this.quanxianid,this.subminxgxx)
                //console.log(this.subminxgxx)
                //console.log(this.xgyh.roles[0].id)
                console.log(this.quanxianid)
                this.userVisible=false
                this.getlist()
            },
            async add(){

                const res= await this.$http.post("address/findAll")
                this.addresslist2=res.data
                this.dialogVisible=true
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
