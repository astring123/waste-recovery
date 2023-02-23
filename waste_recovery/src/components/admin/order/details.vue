<template>
  <el-dialog
      title="订单详情"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" :label-width="width">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="发布者姓名">
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="发布者电话">
        <el-input v-model="form.phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="废品类型">
        <el-input v-model="form.type" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="废品重量(kg)">
        <el-input v-model="form.weight" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="废品图片">
        <img :src="`http://localhost:8080/${form.img}`" class="img"/>
      </el-form-item>
      <el-form-item label="上门时间">
        <div>{{form.time}}</div>
      </el-form-item>
      <el-form-item label="回收员姓名">
        <el-input v-model="form.recycler_name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="回收员电话">
        <el-input v-model="form.recycler_phone" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        v-if="form.state != 'finish'"
        type="success"
        @click="finish"
      >完成</el-button>
      <el-button
        type="danger"
        @click="remove"
      >删除</el-button>
      <el-button @click="cancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/upload'
import {
  apiUpdateOrder,
  apiRemoveOrder
} from '@/api/index.js'

export default {
  name: "order-details",
  components:{Upload},
  props:{
    isOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
    info:{
      type: Object,
    },
  },
  data(){
    return {
      form:{},//表单
      width: '100px',//标题宽度
      imgPath: 'user/upload',
      id: '',//用户id
    }
  },
  watch:{
    info(val){
      console.log('info',val)
      if(val.id){
        val.recycler_name = val.recyclerInfo ?
            val.recyclerInfo.name : ''
        val.recycler_phone = val.recyclerInfo ?
            val.recyclerInfo.phone : ''
        val.time = val.createdAt.replace('T', ' ')
        val.time = val.time.replace('.000Z', '')
        this.form = val
      }
    },
  },
  methods:{
    //关闭
    cancel(){
      this.form = {}
      this.id = ''
      this.$emit('closeEdit')
    },
    //完成订单
    finish(){
      let params = {
        id: this.form.id,
        state: 'finish'
      }
      let res = apiUpdateOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('订单已完成')
      })
    },
    //删除
    remove(){
      let params = {
        id: this.form.id,
      }
      let res = apiRemoveOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('删除订单成功')
        this.getData(this.currentPage)
      })
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
    //获取身份证正面路径
    getFrontImgPath(path){
      this.form.front_img = path
    },
  }
}
</script>

<style lang="less" scoped>
.img{
  width: 80px;
  height: 80px;
}
</style>