<template>
  <div class="menu">
    <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <div v-for="item in menuList">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import {
  userMenu,
  recyclerMenu,
  adminMenu
} from '@/utils/menu.js'

export default {
  name: "myMenu",
  props:{
    permissions:{
      type: String,
    }
  },
  data(){
    return {
      menuList: [],
    }
  },
  created(){
    this.changeMenu()
  },
  watch:{
    "$store.state.permissions": {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        console.log('权限修改')
        this.permissions = val
        this.changeMenu()
      },
      deep: true, //true 深度监听
    },
  },
  methods:{
    //切换菜单
    changeMenu(){
      if(this.permissions == 'user'){
        this.menuList = userMenu
      }else if(this.permissions == 'recycler'){
        this.menuList = recyclerMenu
      }else if(this.permissions == 'admin'){
        this.menuList = adminMenu
      }
    },
    //选择菜单项
    handleSelect(key){
      this.$router.push(key)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
.menu{
  width: 230px;
  height: 100vh;
  background-color: rgb(84, 92, 100);
}
</style>