<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-table
                :data="powerlist"
                border>
            <el-table-column
                    type="index"
                   label="#"
            width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="authName"
                    label="权限名称"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="path"
                    label="路径"
                    width="400">
            </el-table-column>
            <el-table-column

                    label="权限等级"
                    width="300">
                <template v-slot="scop">
                    <el-tag v-if="scop.row.level=='0'">一级权限</el-tag>
                    <el-tag type="success" v-else-if="scop.row.level=='1'">二级权限</el-tag>
                    <el-tag type="warning" v-else>三级权限</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</div>
</template>
<script>
export default {
    data(){
        return {
            powerlist:[]
        }
    },
    created() {
        this.getpowerlist()
    },
    methods:{
       async getpowerlist(){
         const{data:res} = await this.$http.get("rights/list")
           if (res.meta.status!==200) {
               return this.$message.error("获取数据失败")
           }
           this.$message.success("获取数据成功")
          this.powerlist=res.data
        }
    }

}
</script>
<style lang="less" scoped>
   .el-card{
       margin-top: 15px;
   }
</style>
