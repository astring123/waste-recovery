<template>
  <el-dialog
    title="发布回收消息"
    :visible.sync="isOpen"
    :before-close="cancel">
    <el-form :model="form"  label-width="90px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="废品类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="重量（kg）">
        <el-input v-model="form.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上门时间">
        <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="废品照片">
        <upload
            :isOpen="isOpenUpload"
            :type="'img'"
            :path="imgPath"
            :form="form"
            @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>import Upload from '@/components/upload'

import {
  apiCreateOrder,
} from '@/api/index.js'
import {apiGetAllWaste, apiUploadOrderImg} from "../../../api";

export default {
  name: "create",
  components:{
    Upload
  },
  props:{
    isOpen: {
      type: Boolean,
    }
  },
  data(){
    return {
      form:{},
      imgPath: 'http://localhost:8080/order/upload',//图片上传的路径
      isOpenUpload: true,
      options:[],//废品类型列表
    }
  },
  created(){
    //获取全部废品类型
    let res = apiGetAllWaste()
    res.then(data => {
      console.log(data)
      let list = []
      data.result.list.forEach(item => {
        list.push({label:item.name, value:item.name })
      })
      this.options = list
    })
  },
  methods:{
    //取消
    cancel(){
      this.$emit('close')
    },
    //确定
    submit(){
      let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
      this.form.user_id = info.id
      let res = apiCreateOrder(this.form)
      res.then(data => {
        console.log(data)
        this.$emit('refresh',true)
        this.$message.success('创建订单成功')
        this.cancel()
      })
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
  }
}
</script>

<style scoped>

</style>