<template>
  <div id="app">
    <div class="top" v-if="$route.path != '/login'">
      <div class="title">废品回收系统</div>
      <div class="userInfo">
        <div class="img">
          <img :src="`http://localhost:8080/${userInfo.img}`"/>
        </div>
        <el-dropdown>
          <span class="username">{{userInfo.username}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="permissions!='admin'">
              <div @click="openUpdate('password')">修改密码</div>
            </el-dropdown-item>
            <el-dropdown-item v-if="permissions!='admin'">
              <div @click="openUpdate('info')">修改个人信息</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <div class="content-left" v-if="$route.path != '/login'">
        <my-menu :permissions="permissions"></my-menu>
      </div>
      <div class="content-right">
        <router-view/>
      </div>
    </div>
    <info
      :isUpdate="isUpdate"
      :updateType="updateType"
      @close="closeInfo">
    </info>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import MyMenu from '@/components/menu'
import Info from '@/components/top/info'

export default {
  name: "index",
  components:{
    MyMenu,
    Info,
  },
  data(){
    return {
      permissions: 'admin',//用户权限，默认为管理员
      isUpdate: false,//是否修改个人信息、密码
      updateType: 'password',//修改类型，默认修改密码
      userInfo: {},//用户信息
    }
  },
  created(){
    if(localStorage.getItem('userInfo')){ //本地缓存中有用户信息，表示还在登录状态，就将isLogin设置为true
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.permissions = this.userInfo.permissions //在本地缓存中拿到用户权限
    }
  },
  watch: {
    "$store.state.permissions": {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.permissions = val
        if(localStorage.getItem('userInfo')){ //本地缓存中有用户信息，表示还在登录状态，就将isLogin设置为true
          this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
          this.permissions = this.userInfo.permissions //在本地缓存中拿到用户权限
        }
      },
      deep: true, //true 深度监听
    },
  },
  methods:{
    ...mapActions(['permissionsAction','isLoginAction']),
    //修改密码、个人信息
    openUpdate(type){
      this.isUpdate = true
      this.updateType = type
    },
    //退出登录
    logout(){
      this.permissionsAction('')
      this.isLoginAction(false)
      this.userInfo = {}
      localStorage.removeItem('token') //清空本地缓存
      localStorage.removeItem('userInfo') //清空本地缓存
      this.$router.push('/login')
      // console.log(this.$store.state.permissions)
    },
    //关闭修改信息
    closeInfo(){
      this.isUpdate = false
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100vh;
  overflow: hidden;

  .top {
    width: 100%;
    height: 70px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: white;
      font-weight: bold;
      font-size: 30px;
      padding-left: 20px;
    }

    .userInfo {
      color: white;
      display: flex;
      align-items: center;

      .img img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        margin-right: 20px;
      }

      .username {
        margin-right: 30px;
        color: white;
      }
    }
  }

  .content {
    display: flex;

    .content-right {
      flex: 1;
    }
  }
}
</style>
