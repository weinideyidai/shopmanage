<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购物车管理</el-breadcrumb-item>
            <el-breadcrumb-item>购物车信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">

            <el-row :gutter="20">

                <el-col :span="9"> <div class="grid-content bg-purple"> <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.key.name" clearable @clear="getlist">
                    <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
                </el-input>
                </div></el-col>

            </el-row>
            <el-divider></el-divider>
            <el-button type="danger" size="mini" @click="pljy">批量禁用</el-button>
            <el-table
                    :data="userlist"
                    style="width: 100%" border  @selection-change="handleSelectionChange" :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                        type="selection"
                        width="40">
                </el-table-column>
                <el-table-column
                        type="index"
                        width="40"
                        label="#"
                >

                </el-table-column>
                <el-table-column

                        label="客户名"
                        width="120">
                    <template slot-scope="scope">{{scope.row.customerVO.username}}</template>
                </el-table-column>
                <el-table-column

                        label="电话"
                        width="120">
                    <template slot-scope="scope">{{scope.row.customerVO.phone}}</template>
                </el-table-column>
                <el-table-column

                        label="创建时间"
                        width="120"
                        sortable>
                    <template slot-scope="scope">{{scope.row.customerVO.created}}</template>
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="购买数量"
                        width="100">
                </el-table-column>
                <el-table-column

                        label="购买产品"
                        width="140"
                        >
                    <template slot-scope="scope">{{scope.row.goodsVO.name}}</template>
                </el-table-column>
                <el-table-column
                        label="产品图片"
                        width="140"
                >
                    <template slot-scope="scope"><img :src="scope.row.goodsVO.img" style="width: 80px"></template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="140">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==1">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop=""
                        label="操作"
                        width="275">
                    <template slot-scope="scop">

                        <el-button type="danger"  size="mini" @click="deleteuser(scop.row.id)">弃用</el-button>
                        <el-button type="success" size="mini" @click="start(scop.row.id)">启用</el-button>
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
        <el-dialog
                title="添加用户信息"
                :visible.sync="dialogVisible"
                width="50%"
                @close="dialogVisibleclose">
            <el-form label-width="80px" :model="addform" :rules="addformrules" ref="addformref">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addform.password"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="phone">
                    <el-input v-model="addform.phone"></el-input>
                </el-form-item>
                <el-form-item label="aid" >
                    <el-select v-model="addform.aid" placeholder="请选择">
                        <el-option
                                v-for="item in addresslist2"
                                :key="item.id"
                                :label="item.address"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
                <el-form-item label="用户名"  prop="username">
                    <el-input v-model="xgyh.username" ></el-input>
                </el-form-item>
                <el-form-item label="手机" >
                    <el-input v-model="xgyh.phone"></el-input>
                </el-form-item>

                <el-form-item label="请选地址" >
                    <el-select v-model="xgyh.aid" placeholder="请选择">
                        <el-option
                                v-for="item in addresslist"
                                :key="item.id"
                                :label="item.address"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="userVisible = false">取 消</el-button>
    <el-button type="primary" @click="xgyes">确 定</el-button>
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
                quanxianid:"",
                customerlist:[]

            }
        },
        created() {
            this.getlist()
        },
        methods:{
            async getlist(){



                const {data:res}=  await this.$http.post("car/all",this.queryInfo)
                // if(res.meta.status!==200) return  this.$message.error("获取失败")
                this.$message.success("获取用户数据成功")
                //console.log(res)thi
                //this.queryInfo.key.begin=""
                // this.queryInfo.key.end=""
                this.userlist=res.list
                console.log(this.userlist)
                this.total=res.total
                const { data:res1}= await this.$http.post("customer/findAll")

                this.customerlist=res1
            },
            dialogVisibleclose(){
                this.$refs.addformref.resetFields()
            },
            adduser(){
                this.$refs.addformref.validate(async valid=>{
                    if (!valid) return
                    const res    =await this.$http.post("customer/save",this.addform)
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
                const res=   await   this.$http.get("customer/find/"+v1)
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
                const  msg=await this.$confirm('此操作将永久禁用该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err =>err)
                if (msg!=="confirm") {
                    return this.$message.info("取消了禁用操作")
                }
                const res= await this.$http.post(`car/updateStateId/${v1}/0`)
                console.log(res)
                //if (res.meta.status!==200) return this.$message.error("删除失败")
                this.$message.success("禁用成功")
                this.getlist()
            },


            handleSelectionChange(v1){
                this.multipleSelection=v1
            },
            async start(v1){
                const res= await this.$http.post(`car/updateStateId/${v1}/1`)
                this.$message.success("启用成功")
                console.log(res)
                this.getlist()
            },
            async  pljy(){
                if (this.multipleSelection.length==0) {return this.$message.error("请选择需要删除的数据")}
                this.multipleSelection.forEach(member=>{
                    this.newArrs.push(member.id)
                })
                const  msg=await this.$confirm('此操作将永久禁用该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err =>err)
                if (msg!=="confirm") {
                    this.multipleSelection=[]
                    this.newArrs=[]
                    return this.$message.info("取消了禁用操作")

                }
                const res =await this.$http.post("car/updateStateIds",this.newArrs)
                this.$message.success("批量禁用成功")
                console.log(res)
                this.multipleSelection=[]
                this.newArrs=[]
                this.getlist()
            },
            async xgyes(){

                const res = await this.$http.post("customer/updateCustomer",{id:this.xgyh.id,username:this.xgyh.username,phone:this.xgyh.phone,aid:this.xgyh.aid})
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

