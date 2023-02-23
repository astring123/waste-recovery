<template>
  <el-dialog
      :title="`${title}公告`"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" :label-width="width">
      <el-form-item label="公告内容">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="form.content">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {apiCreateAnn, apiUpdateAnn} from "../../../api";

export default {
  name: "announcement-edit",
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
    return{
      form: {
        content:'',
      },
      title: '添加',
      width: '100px',//标题宽度
      id: '',
    }
  },
  watch:{
    info(val){
      console.log('info',val)
      if(val.id){
        this.title = '编辑'
        this.form.content = val.content
        this.id = val.id
      }else{
        this.title = '添加'
        this.form = {
          content: ''
        }
      }
    },
  },
  methods:{
    //确定
    submit(){
      if(this.id){ //编辑
        console.log('编辑')
        let params = {
          id: this.id,
          content: this.form.content,
        }
        let data = apiUpdateAnn(params)
        data.then(res => {
          console.log(res)
          this.$message.success('修改公告信息成功')
          this.cancel()
          this.$emit('refresh',true)
        })
      }else{ //添加
        console.log('添加表单',this.form)
        let params = {
          content: this.form.content
        }
        console.log(params)
        let data = apiCreateAnn(params)
        data.then(res => {
          console.log(res)
          this.cancel()
          this.$message.success('添加公告成功')
          this.$emit('refresh',true)
        })
      }
    },
    //关闭
    cancel(){
      this.form = {
        content: '',
      }
      this.$emit('closeEdit')
    },
  }
}
</script>

<style scoped>

</style>