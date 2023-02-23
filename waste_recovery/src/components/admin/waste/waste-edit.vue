<template>
  <el-dialog
      :title="title"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="废品图片" :label-width="width">
        <upload
            :isOpen="isOpen"
            :id="id"
            :path="imgPath"
            :img="form.img"
            @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
      <el-form-item label="废品名称" :label-width="width">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类型" :label-width="width">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="价格（元/斤）" :label-width="width">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  apiCreateWaste,
  apiUpdateWaste
} from "../../../api";
import Upload from '@/components/upload'

export default {
  name: "waste-edit",
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
    return{
      form:{},//表单
      title: '添加用户',
      width: '120px',//标题宽度
      imgPath: 'http://localhost:8080/user/upload',
      id: '',//用户id
    }
  },
  watch:{
    info:{
      handler(val){
        if(val.id){ //编辑
          console.log('编辑',val)
          this.id = val.id + ''
          this.title = '编辑'
          this.form = val
        }else{ //添加
          console.log('添加')
          this.title = '添加用户'
        }
      },
      deep: true
    }
  },
  methods:{
    //确定
    submit(){
      console.log(this.form)
      if(this.info.id){ //编辑
        console.log('编辑：',this.form)
        let res = apiUpdateWaste(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('编辑废品信息成功')
        })
      }else{ //新增
        console.log('新增：',this.form)

        let res = apiCreateWaste(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('添加废品图鉴成功')
        })
      }
    },
    //关闭
    cancel(){
      this.form = {}
      this.id = ''
      this.$emit('closeEdit')
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
  }
}
</script>

<style lang="less" scoped>

</style>