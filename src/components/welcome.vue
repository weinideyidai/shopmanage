<template>
    <div><h2>welcome 电商后台管理系统</h2>
        <el-calendar v-model="value">
        </el-calendar>
    </div>



</template>
<script>
export default {
    data() {
        return {
            value: new Date()
        }
    }
}
</script>

<style lang="less" scoped>
.el-calendar{

    heigth:200px;
    width: 600px;
    margin-left: 200px;
}
</style>
