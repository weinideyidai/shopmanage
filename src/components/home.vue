<template>
    <el-container class="home_container">
        <el-header><span class="font_s">电商后台管理系统</span>  <div><span class="z">欢迎用户: {{this.$store.state.username}}</span><el-button type="info" @click="out" class="btn">退出</el-button> </div></el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu

                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b" router unique-opened :default-active="ac">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>权限管理</span>
                        </template>
                            <el-menu-item index="/users" @click="active('/users')"><i class="el-icon-s-operation" ></i>用户信息</el-menu-item>
                        <el-menu-item index="/roles" @click="active('/roles')"><i class="el-icon-s-operation"></i>角色信息</el-menu-item>
                        <el-menu-item index="/resources"  @click="active('/resources')"><i class="el-icon-s-operation"></i>资源信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>客户管理</span>
                        </template>
                        <el-menu-item index="/customer"  @click="active('/customer')"><i class="el-icon-s-operation"></i>客户信息</el-menu-item>
                        <el-menu-item index="/address"  @click="active('/address')"><i class="el-icon-s-operation"></i>地址信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="/brand" @click="active('/brand')"><i class="el-icon-s-operation" ></i>品牌信息</el-menu-item>
                    <el-menu-item index="/color"  @click="active('/color')"><i class="el-icon-s-operation"></i>颜色信息</el-menu-item>
                    <el-menu-item index="/commodity" @click="active('/commodity')"><i class="el-icon-s-operation"></i>商品类型信息</el-menu-item>
                    <el-menu-item index="/size"  @click="active('/size')"><i class="el-icon-s-operation"></i>尺寸信息</el-menu-item>
                        <el-menu-item index="/information"  @click="active('/information')"><i class="el-icon-s-operation"></i>商品信息</el-menu-item>
                </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-shopping-cart-2"></i>
                            <span>购物车管理</span>
                        </template>
                        <el-menu-item index="/shoppingcar"  @click="active('/shoppingcar')"><i class="el-icon-s-operation"></i>购物车信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location-outline"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="/order"  @click="active('/order')"><i class="el-icon-s-operation"></i>订单信息</el-menu-item>


                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>日志管理</span>
                        </template>
                        <el-menu-item index="/log"  @click="active('/log')"><i class="el-icon-s-operation"></i>日志信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-s-marketing"></i>
                            <span>报表管理</span>
                        </template>
                        <el-menu-item index="/regionalreport"  @click="active('/regionalreport')"><i class="el-icon-s-operation"></i>地区客户报表</el-menu-item>
                        <el-menu-item index="/companyreport"  @click="active('/companyreport')"><i class="el-icon-s-operation"></i>公司总订单报表</el-menu-item>
                        <el-menu-item index="/peoplereport"  @click="active('/peoplereport')"><i class="el-icon-s-operation"></i>个人年订单报表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-chat-dot-square"></i>
                            <span>聊天室</span>
                        </template>
                        <el-menu-item index="/chat"  @click="active('/chat')"><i class="el-icon-s-operation"></i>聊天室</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-main>


                <router-view></router-view>

            </el-main>
        </el-container>
    </el-container>
</template>
<script>

    export default {
created(){
    this.GetMenuList()
    this.ac=window.sessionStorage.getItem("ap")
},
        data(){
            return{

                ac:""

            }
        },
        methods:{
            out(){
                window.sessionStorage.clear()
                this.$router.push("/login")
            },
           async GetMenuList(){
          const res =   await this.$http.get("user")
               // if (res.meta.status !==200) return  this.$message.error(res.meta.message)
                //this.menulist =res.data
               console.log(res)
            },
            active(i){
                window.sessionStorage.setItem("ap",i)
                this.ac=window.sessionStorage.getItem("ap")
            }
        }
    }
</script>
<style lang="less" scoped>
    .home_container{

        height: 100%;
    }
.el-header{
    background-color: #373d41;
   display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
width: 100%;

}
.el-aside{
    background-color: #373d41;
    .el-menu {
        border-right: none;
    }
}


  .head_box{

      width: 200px;
  }
    .font_s{
        font-size: 20px;
        color: #eeeeee;

    }
.el-main{
    height: 650px;
    width: 100%;
}
    .z{
        color: white;

    }

</style>
