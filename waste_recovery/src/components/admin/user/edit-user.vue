<template>
  <el-dialog
      :title="title"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像" :label-width="width">
        <upload
            :isOpen="isOpen"
            :id="id"
            :path="imgPath"
            :img="form.img"
            @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
      <el-form-item label="用户名" :label-width="width">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="width">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="width">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="width">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="width">
        <el-select v-model="form.authority" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="width">
        <el-input v-model="form.id_card"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" :label-width="width">
        <upload
            :isOpen="isOpen"
            :id="id"
            :path="imgPath"
            :img="form.front_img"
            @getImgPath="getFrontImgPath"
        ></upload>
      </el-form-item>
      <el-form-item label="身份证反面" :label-width="width">
        <upload
            :isOpen="isOpen"
            :id="id"
            :path="imgPath"
            :img="form.back_img"
            @getImgPath="getBackImgPath"
        ></upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/upload'
import {
  apiUpdateUser,
  apiRegister,
} from '@/api/index.js'

export default {
  name: "edit-user",
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
      options:[
        {value: 'user', label: '普通用户'},
        {value: 'recycler', label: '回收员'},
        {value: 'admin', label: '管理员'},
      ],
      width: '100px',//标题宽度
      imgPath: 'http://localhost:8080/user/upload',
      id: '',//用户id
      title: '添加用户'
    }
  },
  watch:{
    info(val){
      if(val){ //编辑
        console.log('编辑',val)
        this.id = val.id + ''
        this.title = '编辑'
        this.form = val
      }else{ //添加
        console.log('添加')
        this.title = '添加用户'
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
    //确定
    submit(){
      console.log(this.form)
      if(this.info){ //编辑
        console.log('编辑：',this.form)
        let res = apiUpdateUser(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('编辑用户成功')
        })
      }else{ //新增
        console.log('新增：',this.form)

        let res = apiRegister(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('添加用户成功')
        })
      }
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
    //获取身份证正面路径
    getFrontImgPath(path){
      this.form.front_img = path
    },
    //获取身份证背面路径
    getBackImgPath(path){
      this.form.back_img = path
    }
  }
}
</script>

<style scoped>

</style>