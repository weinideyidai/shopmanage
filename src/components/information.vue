<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">

            <el-row :gutter="24">

                <el-col :span="6"> <div class="grid-content bg-purple"> <el-input placeholder="请输入商品名"  class="input-with-select" v-model="queryInfo.key.name" clearable @clear="getlist">

                </el-input></div></el-col>
                <el-col :span="6"> <div class="grid-content bg-purple"> <el-input placeholder="请输入价格"  class="input-with-select" v-model="queryInfo.key.price" clearable @clear="getlist">

                </el-input></div></el-col>
                <el-col :span="6">
                <el-select v-model="queryInfo.key.bid" placeholder="请选择" clearable>
                    <el-option
                            v-for="item in brandlist "
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary"  @click="getlist">提交</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="2">
                    <el-button type="danger" size="mini" @click="plsc">批量禁用</el-button>
                </el-col>
                <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="add()" size="mini">添加商品</el-button></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"><el-button type="warning" @click="importExcel()" size="mini">批量导入</el-button></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"><el-button type="success" @click="download()" size="mini">批量导出</el-button></div></el-col>
            </el-row>

            <el-table
                    :data="userlist"
                    style="width: 100%" border  @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column
                        type="index"
                        width="40"
                        label="#"
                >

                </el-table-column>
                <el-table-column
                        prop="name"
                        label="商品名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="数量"
                        width="80">
                </el-table-column>
                <el-table-column
                        label="品牌信息"
                        width="180">
                    <template slot-scope="scope"> <div><el-tag type="primary">{{scope.row.brandsVO.name}}</el-tag>
                        <img :src="scope.row.brandsVO.img" style="width: 50px">

                    </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="颜色信息"
                        width="120">
                    <template slot-scope="scope"> <div><el-tag type="success">{{scope.row.colourVO.name}}</el-tag>

                    </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品类型信息"
                    width="120">
                <template slot-scope="scope"> <div><el-tag type="info">{{scope.row.goodTypeVO.name}}</el-tag>


                </div>
                </template>
            </el-table-column>
                <el-table-column
                        label="尺寸信息"
                        width="140">
                    <template slot-scope="scope"> <div><el-tag type="warning">{{scope.row.sizeVO.size}}</el-tag>


                    </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scop">
                        <el-tag v-if="scop.row.status==1">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop=""
                        label="操作"
                        width="220">
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
            <el-form label-width="80px" :model="addform" :rules="rules" ref="addformref">
                <el-form-item label="商品名" >
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" >
                    <el-input v-model="addform.price"></el-input>
                </el-form-item>
                <el-form-item label="图片上传" >
                    <div>
                        <input  type="file" accept="image/*" ref='input' class="input" >
                    </div>
                </el-form-item>
                <el-form-item label="商品类型" >
                    <el-select v-model="addform.tid" placeholder="请选择">
                        <el-option
                                v-for="item in goodTypelist "
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌信息" >
                    <el-select v-model="addform.bid" placeholder="请选择">
                        <el-option
                                v-for="item in brandlist "
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="颜色信息" >
                    <el-select v-model="addform.cid" placeholder="请选择">
                        <el-option
                                v-for="item in colourlist "
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="尺寸信息" >
                    <el-select v-model="addform.sid" placeholder="请选择">
                        <el-option
                                v-for="item in sizelist "
                                :key="item.id"
                                :label="item.size"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量" >
                    <el-input v-model="addform.count"></el-input>
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
            <el-form label-width="80px" :model="xgyh" :rules="xgyhformrules1" ref="xgyhformref">
                <el-form-item label="商品名"  prop="name">
                    <el-input v-model="xgyh.name" ></el-input>
                </el-form-item>
                <el-form-item label="价格"  prop="price">
                    <el-input v-model="xgyh.price" type="number"></el-input>
                </el-form-item>
                <el-form-item label="数量"  prop="count">
                    <el-input v-model="xgyh.count" type="number"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="userVisible = false">取 消</el-button>
    <el-button type="primary" @click="xguser">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                title="批量导入"
                :visible.sync="pldrdialogVisible"
                width="50%"
                @close="dialogVisibleclose">
            <el-form label-width="80px"   ref="addformref">

                <el-form-item label="Excel导入">

                    <div>
                        <input  type="file"  ref='input' class="input" >
                        <button @click="publish">上传</button>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="pldrdialogVisible = false">取 消</el-button>

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
                        name:"",
                        price:"",
                        bid:""
                    }
                },
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
                rules:{
                    address:[ { required: true, message: '请输入地址名称', trigger: 'blur' } ],
                    price:[{ required: true, message: '请输入邮编名称', trigger: 'blur' ,type:"number"}],
                    count:[{ required: true, message: '请输入邮编名称', trigger: 'blur',type:"number" }]

                },
                userlist:[],
                total:0,
                userVisible:false,
                xgyh:{},
                xgyhformrules1:{

                    name:[{ required: true, message: '请商品名称', trigger: 'blur' }],
                    price:[{ required: true, message: '请输入价格', trigger: 'blur' }
                       ],
                    count:[{ required: true, message: '请输入数量', trigger: 'blur' }]
                },
                setroledialogVisible:false,
                roleinfo:{},
                rolelist:{},
                rolevalue:'',
                multipleSelection: [],
                newarr:[],
                value:"",
                goodTypelist:[],
                brandlist:[],
                colourlist:[],
                sizelist:[],
                pldrdialogVisible:false

            }
        },
        created() {
            this.getlist()
        },
        methods:{
            async getlist(){
                const {data:res}=  await this.$http.post("goods/all",this.queryInfo)
                // if(res.meta.status!==200) return  this.$message.error("获取失败")
                this.$message.success("获取数据成功")
                console.log(res)
                this.userlist=res.list
                this.total=res.total
                const res1= await this.$http.post("brands/findAll")
                this.brandlist=res1.data
            },
            dialogVisibleclose(){
                this.$refs.addformref.resetFields()
                this.addform.name=""
            },
            adduser(){
                this.$refs.addformref.validate(async valid=> {
                    if (!valid) return
                    const res = await this.$http.post("goods/save", this.addform)
                    console.log(res)
                    this.getlist()
                    this.$message.success("添加成功")
                    this.pldrdialogVisible = false
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

                const res=   await   this.$http.get("goods/find/"+v1)
                this.xgyh=res.data
                console.log(this.xgyh)
                console.log(res)
                this.userVisible=true
            },
            xhyhclose(){
                this.xgyh={}
                this.$refs.xgyhformref.resetFields()

            },
            xguser(){
                this.$refs.xgyhformref.validate(async valid=> {
                    if (!valid) {return this.$message.error("请填写必填信息") }
                    const res = await this.$http.post("goods/updateColour", {
                        id: this.xgyh.id,
                        name: this.xgyh.name,
                        price:this.xgyh.price,
                        count:this.xgyh.count
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
                const res= await this.$http.post(`goods/updateStateId/${v1}/0`)
                console.log(res)
                //if (res.meta.status!==200) return this.$message.error("删除失败")
                this.$message.success("删除成功")
                this.getlist()
            },
            async star(v1){
                const res= await this.$http.post(`goods/updateStateId/${v1}/1`)
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
                const res=await  this.$http.post("goods/updateStateIds",this.newarr)
                this.getlist()
            },
          async  add(){
               // this.dialogVisible=true
              this.$router.push("/goods/add")

            },

           async port(){
               const res=await this.$http.get("excel/export")
               //console.log(res)

            },
            download() {
                this.$http({
                    method: 'get',
                    url: 'excel/export',
                    // headers里面设置token
                    headers: {
                        Authorization:'Bearer ' + window.sessionStorage.getItem("token")
                    },
                    // 二进制流文件，一定要设置成blob，默认是json
                    responseType: 'blob'
                }).then(res => {
                    const link = document.createElement('a')
                    const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                    link.style.display = 'none'
                    link.href = URL.createObjectURL(blob)
                    link.setAttribute('download', `${name}.xlsx`)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
            },async  publish(){
                let ip = this.$refs.input;
                let formdata = new FormData()
                formdata.append("file", ip.files[0]);
                //上传的照片如果想要在页面中显示
                //html中创建一个img标签 ref设置为img
                //let img = this.$refs.img
                //const reader = new FileReader()
                //reader.readAsDataURL(ip.files[0])
                //reader.οnlοad=function(e){
                const res= await this.$http
                    .post("http://120.24.27.228:8080/excel/importExcel", formdata, {
                        headers: { "Content-Type": "multipart/form-data" }
                    })
                this.$message.success("上传成功")
                this.pldrdialogVisible=false
                this.getlist()

            }
            ,
            importExcel(){
                this.pldrdialogVisible=true
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

