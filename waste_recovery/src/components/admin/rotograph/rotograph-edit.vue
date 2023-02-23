<template>
  <el-dialog
      :title="'添加轮播图'"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" :label-width="width">
      <el-form-item label="轮播图">
        <upload
            :isOpen="isOpen"
            :path="imgPath"
            :img="form.img"
            @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {apiCreateRot} from "../../../api";
import Upload from '@/components/upload'

export default {
  name: "rotograph-edit",
  components:{Upload},
  props:{
    isOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  data(){
    return{
      form:{},//表单
      width: '100px',//标题宽度
      imgPath: 'http://localhost:8080/user/upload',
      id: '',
    }
  },
  methods:{
    //确定
    submit(){
      console.log('添加表单',this.form)
      let params = {
        img: this.form.img
      }
      console.log(params)
      let data = apiCreateRot(params)
      data.then(res => {
        console.log(res)
        this.cancel()
        this.$message.success('添加轮播图成功')
        this.$emit('refresh',true)
      })
    },
    //关闭
    cancel(){
      this.form = {
        img: '',
      }
      this.$emit('closeEdit')
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