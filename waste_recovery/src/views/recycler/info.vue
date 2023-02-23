<template>
  <div class="info">
    <el-card>
      <div class="top">
        <div class="title">我的信息</div>
        <div class="bg"></div>
      </div>
      <div style="margin-top: 30px;display: flex;align-items: center;">
        <div style="font-weight: bold;font-size: 18px;">提示：</div>
        <div>如需更改个人信息请联系邮箱 123456@163.com 。</div>
      </div>
    </el-card>
    <div class="content">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="form.id_card" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面">
          <img style="width: 400px;height: 200px;" :src="`http://localhost:8080/${form.front_img}`"/>
        </el-form-item>
        <el-form-item label="身份证背面">
          <img style="width: 400px;height: 200px;" :src="`http://localhost:8080/${form.back_img}`"/>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">创建</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>

import {apiGetUserInfo} from "../../api";

export default {
  name: "info",
  data(){
    return{
      form:{},
      imageUrl:'',
      imgPath: 'http://localhost:8080/order/upload',//图片上传的路径
      isOpen: true,
    }
  },
  created(){
    let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
    let id = info.id
    this.getInfo(id)
  },
  methods:{
    //获取回收员信息
    getInfo(id){
      console.log(id)
      let res = apiGetUserInfo({pageNum:1, pageSize:10, id})
      res.then(data => {
        console.log(data)
        this.form = data.result.list[0]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.info{
  padding: 20px;

  .top{
    position: relative;
    font-weight: bold;
    font-size: 26px;

    .bg{
      position: absolute;
      top: 38px;
      width: 100px;
      height: 5px;
      background-color: rgb(41, 167, 225);
    }
  }

  .content{
    margin-top: 50px;
  }
}
</style>