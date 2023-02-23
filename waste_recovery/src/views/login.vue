<template>
  <div class="login">
    <div class="login-box">
      <div class="title">废品回收系统</div>
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="register">
        <el-button
          type="text"
          @click="() => {this.isRegister = true}"
          v-if="!isRegister">
          立即注册
        </el-button>
        <el-button
            v-if="isRegister"
            type="text"
            @click="() => {this.isRegister = false}">
          返回登录
        </el-button>
      </div>
      <el-button
        v-if="!isRegister"
        type="primary"
        class="login-btn"
        @click="login">
        登录
      </el-button>
      <el-button
          v-else
          type="success"
          class="login-btn"
          @click="register">
        注册
      </el-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {
  apiLogin,
  apiRegister
} from '@/api/index.js'

export default {
  name: "login",
  data(){
    return {
      form:{},
      isRegister: false, //是否为注册
    }
  },
  watch:{
    isRegister(val){
      this.form = {}
    }
  },
  methods:{
    ...mapActions(['permissionsAction','isLoginAction']),
    //登录
    login(){
      console.log(this.form)
      let res = apiLogin(this.form)
      res.then(data => {
        console.log(data)
        if(data.code==0){

          let permissions = data.userInfo.permissions
          //设置 vuex 里存储得数据
          this.permissionsAction(permissions)

          //将用户信息和token存入本地
          localStorage.setItem("userInfo",JSON.stringify(data.userInfo))
          localStorage.setItem("token",data.token);

          if(permissions == 'admin'){ //如果是管理员权限
            this.$router.push('/admin/userInfo') //跳转到 /admin/userInfo
          }else if(permissions == 'recycler'){ //普通用户权限
            this.$router.push('/recycler/order')
          }else if(permissions == 'user'){
            this.$router.push('/')
          }

          this.$message.success('登录成功')

        }else if(data.code==1060){
          this.$message.error('账号密码错误')
        }else if(data.code==1061){
          this.$message.error('用户不存在')
        }
      })
    },
    //注册
    register(){
      console.log(this.form)
      let data = apiRegister(this.form)
      data.then(res => {
        console.log(res)
        this.$message.success('注册成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100vh;
  //padding-bottom: 10px;
  //position: relative;
  background: url("../../src/assets/images/loginbg.jpg") no-repeat;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 背景图垂直、水平均居中 */
  background-position: center center;

  .login-box{
    width: 30%;
    height: 260px;
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-shadow:0px 3px 10px rgba(0,0,0,0.2);

    .title{
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }

    .register{
      width: 100%;
      display: flex;
      justify-content: right;
      position: relative;
      top: -20px;
    }

    .login-btn{
      width: 100%;
    }
  }
}

/deep/ .el-button--text{
  color: rgb(59, 134, 232);
  font-weight: bold;
}
</style>