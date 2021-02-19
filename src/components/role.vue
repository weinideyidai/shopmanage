<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">

            <el-row :gutter="20">

                <el-col :span="9"> <div class="grid-content bg-purple"> <el-input placeholder="请输入角色名"  class="input-with-select" v-model="queryInfo.key.name" clearable @clear="getlist">
                    <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
                </el-input></div></el-col>

            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="2">
                <el-button type="danger" size="mini" @click="plsc">批量禁用</el-button>
            </el-col>

                    <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" size="mini" @click="dialogVisible=true">添加角色</el-button></div></el-col>

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
                        label="角色"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="权限"
                        width="180">
                    <template slot-scope="scop"><p v-if="scop.row.permissionVOS !== undefined &&scop.row.permissionVOS.length>0"><el-tag v-for="item in scop.row.permissionVOS " :key="item.id">{{item.mname}}</el-tag></p></template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="220">
                    <template slot-scope="scop"><p v-if="scop.row.permissionVOS !== undefined &&scop.row.permissionVOS.length>0"><el-tag v-for="item in scop.row.permissionVOS " :key="item.id">{{item.url}}</el-tag></p></template>
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
                        width="240">
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
                title="添加角色"
                :visible.sync="dialogVisible"
                width="50%"
                @close="dialogVisibleclose">
            <el-form label-width="80px" :model="addform" :rules="twt" ref="addformref1">
                <el-form-item label="角色名"  prop="name">
                    <el-input v-model="addform.name"></el-input>
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
            <el-form label-width="80px" :model="xgyh" :rules="rolerules" ref="xgyhformref">
                <el-form-item label="角色名"  prop="name">
                    <el-input v-model="xgyh.name" ></el-input>
                </el-form-item>
                <el-form-item label="选择权限" >
                    <el-select v-model="value.gg" placeholder="请选择">
                        <el-option
                                v-for="item in xgyh.permissionVOS"
                                :key="item.id"
                                :label="item.mname"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
                    sortBy:"name",
                    key:{
                        name:""
                    }
                },
                addform:{
                    name:""

                },
                twt:{
                    name:[ { required: true, message: '请输入角色名称', trigger: 'blur' } ]
                },
                userlist:[],
                total:0,
                userVisible:false,
                xgyh:{},
                xgyhformrules:{

                    name:[{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                    mobile:[{ required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '输入合法手机号', trigger: 'blur' }]
                },
                setroledialogVisible:false,
                roleinfo:{},
                rolelist:{},
                rolevalue:'',
                multipleSelection: [],
                newarr:[],
                value:{
                    gg:""
                },
                rolerules:{name:[{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                    value:[{ required: true, message: '请输入权限', trigger: 'blur' }],
                    gg:[{ required: true, message: '不能为空', trigger:'change', type:"number"}]
                }
            }
        },
        created() {
            this.getlist()
        },
        methods:{
            async getlist(){
                const {data:res}=  await this.$http.post("role/all",this.queryInfo)
                // if(res.meta.status!==200) return  this.$message.error("获取失败")
                this.$message.success("获取角色数据成功")
                console.log(res)
                this.userlist=res.list
                this.total=res.total
            },
            dialogVisibleclose(){
                this.$refs.addformref1.resetFields()
                this.addform.name=""
            },
            adduser(){
             this.$refs.addformref1.validate(async valid=> {
                 if (!valid) return this.$message.error("请填写必填信息")
                 const res = await this.$http.post("role/save", this.addform)
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

                const res=   await   this.$http.get("role/find/"+v1)
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
                  if (!valid) return this.$message.error("请填写必填信息")
                  const res = await this.$http.post("role/updateCustomer/" + this.value.gg, {
                      id: this.xgyh.id,
                      name: this.xgyh.name
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
                const res= await this.$http.post(`role/updateStateId/${v1}/0`)
                console.log(res)
                //if (res.meta.status!==200) return this.$message.error("删除失败")
                this.$message.success("删除成功")
                this.getlist()
        },
           async star(v1){
                const res= await this.$http.post(`role/updateStateId/${v1}/1`)
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
                const res=await  this.$http.post("role/updateStateIds",this.newarr)
             this.getlist()
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
