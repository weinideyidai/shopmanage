<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>团队模板</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">

            <el-row :gutter="20">

                <el-col :span="9"> <div class="grid-content bg-purple"> <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.key.username" clearable @clear="getlist">
                    <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
                </el-input> <el-date-picker
                        v-model="value1"
                        type="daterange"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"><el-button type="primary" @click="add">添加用户</el-button></div></el-col>
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
                        width="50"
                        label="#"
                >

                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="created"
                        label="创建时间"
                        width="120"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="aidName"
                        label="地址"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==1">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="角色"
                        width="238">
                    <template slot-scope="scope">
                        <p v-if="scope.row.roles !== undefined && scope.row.roles.length>0"><el-tag v-for="item in scope.row.roles" :key="item.id">{{item.name}}</el-tag></p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作"
                        width="250">
                    <template slot-scope="scop">
                        <el-button type="primary"  size="mini" @click="xgyhxx(scop.row.id)">编辑</el-button>
                        <el-button type="danger"  size="mini" @click="deleteuser(scop.row.id)">弃用</el-button>
                        <el-button type="info" size="mini" @click="start(scop.row.id)">启用</el-button>
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
                <el-form-item label="请选角色" >
                    <el-select v-model="quanxianid" placeholder="请选择">
                        <el-option
                                v-for="item in xgyh.roles"
                                :key="item.id"
                                :label="item.name"
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
                    sortBy:"username",
                    desc:"des",
                    key:{
                        username:"",
                        begin:"",
                        end:"",
                        aid:""
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


            },
            dialogVisibleclose(){
                this.$refs.addformref.resetFields()
            },
            adduser(){


            },
            handleSizeChange(v1){

            },
            handleCurrentChange(v1){

            },

            async  xgyhxx(v1){

            },
            xhyhclose(){
                this.$refs.xgyhformref.resetFields()
            },

            async deleteuser(v1){

            },


            handleSelectionChange(v1){
                this.multipleSelection=v1
            },
            async start(v1){

            },
            async  pljy(){

            },
            async xgyes(){

            },
            async add(){


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
