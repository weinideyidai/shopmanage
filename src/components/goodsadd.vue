<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/information' }">商品信息</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-alert
                title="添加商品信息"
                type="info"
                center
                show-icon
                :closable="false"
        >
        </el-alert>
        <el-steps :space="200" :active="activeName -0" finish-status="success" align-center>
            <el-step title="商品名"></el-step>
            <el-step title="商品价格"></el-step>
            <el-step title="商品类型"></el-step>
            <el-step title="商品品牌"></el-step>
            <el-step title="商品颜色"></el-step>
            <el-step title="商品尺寸"></el-step>
            <el-step title="商品数量"></el-step>
            <el-step title="图片上传"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-form ref="form" :model="addform" label-width="80px">

        <el-tabs v-model="activeName" tab-position="left" :before-leave="beforetable">
            <el-tab-pane label="商品名" name="0">
                <el-form-item label="商品名">
                <el-input v-model="addform.name" style="width: 300px"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品价格" name="1">
                <el-form-item label="商品价格">
                    <el-input v-model="addform.price" style="width: 300px" type="number"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品类型" name="2">
                <el-form-item label="商品类型">
                <el-select v-model="addform.tid" placeholder="请选择">
                    <el-option
                            v-for="item in goodTypelist "
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品品牌" name="3">
                <el-form-item label="商品品牌">
                <el-select v-model="addform.bid" placeholder="请选择">
                    <el-option
                            v-for="item in brandlist "
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品颜色" name="4">
                <el-form-item label="商品颜色">
                <el-select v-model="addform.cid" placeholder="请选择">
                    <el-option
                            v-for="item in colourlist "
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="商品尺寸" name="5">
                <el-form-item label="商品尺寸">
                <el-select v-model="addform.sid" placeholder="请选择">
                    <el-option
                            v-for="item in sizelist "
                            :key="item.id"
                            :label="item.size"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品数量" name="6">
                <el-form-item label="商品数量">
                    <el-input v-model="addform.count" style="width: 300px" type="number"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="图片上传" name="7">
                <el-form-item label="图片上传">
                    <div >
                        <input  type="file" accept="image/*" ref='input' class="input" >
                        <button @click="publish">上传</button>

                    </div>
                   <div style="margin-top: 200px">
                       <el-button @click="addgoods" type="primary">添加商品</el-button>
                   </div>
                </el-form-item>
            </el-tab-pane>


        </el-tabs>
        </el-form>
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
            sizelist:[]

        }
    },
    created() {
        this.get()
    },
    methods:{
       async get(){
           const res= await this.$http.post("goodType/findAll")
           this.goodTypelist=res.data
           const res1= await this.$http.post("brands/findAll")
           this.brandlist=res1.data
           const res2= await this.$http.post("colour/findAll")
           this.colourlist=res2.data
           const res3= await this.$http.post("size/findAll")
           this.sizelist=res3.data
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
     async   addgoods(){
         await this.$http.post("goods/save",this.addform)
           console.log(this.addform)
         this.$message.success("添加数据成功")
         this.$router.push("/information")
        },
        beforetable(activeName, oldActiveName){
           if (oldActiveName=='0'&&this.addform.name.length==0){
               this.$message.error("请填写商品名称")
               return false
           }
        }
    }
}
</script>

<style lang="less" scoped>
.el-tabs{
    margin-top: 15px;
}
</style>
