<template>
    <div class="login_container">
    <div class="box_container">
        <div class="head_box"><img src="../assets/logo.png"></div>
        <el-form ref="loginformref"  :model="loginform" :rules="Formrules"  class="form_contain">
            <el-form-item  prop="username">
                <el-input   prefix-icon="el-icon-user-solid" v-model="loginform.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input   prefix-icon="el-icon-unlock" type="password" v-model="loginform.password"></el-input>
            </el-form-item>
            <el-form-item  class="btn_contain">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetfrom">重置</el-button>
                <a href="javascript:void(0);" class="wangji" @click="wanjidialog">忘记密码</a>
            </el-form-item>

        </el-form>

    </div>
        <el-dialog
                title="输入用户信息"
                :visible.sync="wangjidialogVisible"
                width="50%"
                @close="dialogVisibleclose">
            <el-form label-width="80px" :model="addform" :rules="Formrules" ref="addformref">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addform.username" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password" >
                    <el-input v-model="addform.password" style="width: 400px" type="password"></el-input>
                </el-form-item>
                <el-form-item label="手机号"  prop="phone">
                    <el-input v-model="addform.phone"  style="width: 400px"></el-input>
                    <el-button
                            type="primary"
                            @click="getVerify"
                            style="width:120px;"
                            :disabled="disabled=!show"
                            size="mini"
                    >
                        <span v-show="show">获取验证码</span>
                        <span v-show="!show" class="count">{{count}} s</span>
                    </el-button>

                </el-form-item>
           <el-form-item label="验证码" prop="yzm">
               <el-input placeholder="请输入验证码" v-model="addform.yzm" style="width: 200px" clearable></el-input>
           </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="wangjidialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="adduser">确 定</el-button>
  </span>
        </el-dialog>
    </div>

</template>
<script>
export default {
    data(){
      return{
          loginform:{
            username:"admin",
            password:"123"
        },
          Formrules:{
              username:[
                  { required: true, message: '请输入账号名称', trigger: 'blur' },

              ],
              password:[{ required: true, message: '请输入密码', trigger: 'blur' },],

              phone:[ { required: true, message: '请输入电话号码', trigger: 'blur' },
                  { min: 11, max: 11, message: '电话号码不合法', trigger: 'blur' }
              ],
              yzm:[{ required: true, message: '请输入验证码', trigger: 'blur' },]
          },
          wangjidialogVisible:false,
          addform:{
              username:"",
              phone:"",
              password:"",
              yzm:""
          },
          show: true,
          count: "", // 初始化次数
          timer: null,
          yzm:{
              num:""
          }

      };
    },
    methods:{
        resetfrom(){
          this.$refs.loginformref.resetFields()
        },
        login(){
            this.$refs.loginformref.validate(async valid=>{
               if(!valid) return;
                try {
                    const resulet= await this.$http.post("auth",this.loginform)
                    console.log(resulet.status)
                    //if (resulet.status!=200) return this.$message.error("失败")
                    this.$message.success("登录成功")
                    window.sessionStorage.setItem("token",resulet.data.token)
                    const res =await this.$http.get("user")
                    console.log("1111"+res)
                    this.$store.state.username=res.data.username
                    this.$router.push("/home")//路由跳转
                } catch (err) {
                    console.log(err)
                }

            })
        },
        wanjidialog(){
            this.wangjidialogVisible=true
        },
      async  getVerify() {
            // 验证手机号
            if (this.checkPhone() == false) {
                return false;
            } else {
                const  res = await this.$http.post("user/phoneCode/"+this.addform.phone)
                if (res.status==200){ this.$message.success("验证码发送成功")}
                console.log(res)
                const TIME_COUNT = 60; //更改倒计时时间
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer); // 清除定时器
                            this.timer = null;
                        }
                    }, 1000);
                }
            }
        },
        dialogVisibleclose(){
            this.$refs.addformref.resetFields()
            this.addform.name=""
            this.addform.phone=""
            this.addform.password=""
            this.show = true;
            clearInterval(this.timer);
            this.timer=null
        },
        adduser(){
            this.$refs.addformref.validate(async valid=> {
                if (!valid) return this.$message.error("请填写必填信息")
                  const res=await  this.$http.post("user/updatePassword/"+this.addform.yzm,{username:this.addform.username,password:this.addform.password,phone:this.addform.phone})
                if (res.status==200){this.$message.success("修改密码成功")}
                console.log(res)
                this.show = true;
                clearInterval(this.timer);
                this.timer=null
                this.wangjidialogVisible=false
            })
        },
        checkPhone() {
            let phone = this.addform.phone;
            if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$message.error("请填写正确的手机号");
                return false;
            }
        }


    }

};
</script>
<style lang="less" scoped>
.login_container{

    background-color: #2b4b6b;
    height: 100%;
}
.box_container{
    width: 450px;
    height: 300px;
    background-color: white;
    text-align: center;
    position: absolute;
    border-radius: 5px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);//盒子垂直水平居中

}
.head_box{
    width: 130px;
    height: 130px;
    border: 3px solid #eeee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
       width: 100%;
        height: 100%;
        border-radius: 50% ;
        background-color: #eee;
    }
}
    .btn_contain{
       display: flex;
        justify-content: flex-end;
    }
    .form_contain{
        padding: 10px;
        margin-top: 100px;
    }
    .wangji{
        font-size: 12px;
        text-decoration: none;
        margin-top: 10px;
    }
</style>
