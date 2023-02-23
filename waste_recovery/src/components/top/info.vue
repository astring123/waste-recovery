<template>
  <el-dialog title="修改个人信息" :visible.sync="isUpdate">
    <!--修改密码-->
    <el-form
      v-if="updateType=='password'"
      :model="form"
      label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!--修改个人信息-->
    <el-form
      v-else-if="updateType=='info'"
      label-width="100px"
      :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <upload
            :isOpen="isOpen"
            :type="'img'"
            :path="imgPath"
            :img="form.img"
            @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button
          type="primary"
          @click="submit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Upload from '@/components/upload'
import {apiUpdatePassword, apiUpdateUser} from "../../api";
import {mapActions} from "vuex";

export default {
  name: "info",
  components:{
    Upload
  },
  props:{
    isUpdate:{
      type: Boolean
    },
    updateType: {
      type: String
    }
  },
  data(){
    return {
      form: {},
      dialogFormVisible: false,
      imgPath: 'http://localhost:8080/user/upload',//图片上传的路径
      isOpen: true,
    }
  },
  created(){
    let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
    this.form.id = info.id
  },
  watch:{
    isUpdate(val){
      if(val){
        if(this.updateType == 'info'){ //修改用户信息，获取用户信息并展示
          let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
          console.log(info)
          this.form = info
        }
      }
    }
  },
  methods:{
    ...mapActions(['permissionsAction','isLoginAction']),
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
    //取消
    cancel(){
      this.form = {}
      this.$emit('close')
    },
    //确定
    submit(){
      if(this.updateType == 'password'){ //修改密码
        console.log(this.form)
        let data = apiUpdatePassword(this.form)
        data.then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message.success(res.message)
            this.logout()
          }else{
            this.$message.warning(res.message)
          }
          this.cancel()
        })
      }else{ //修改用户信息
        let data = apiUpdateUser(this.form)
        data.then(res => {
          console.log(res)
          this.$message.success('修改个人信息成功')
          this.cancel()
        })
      }
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
  }
}
</script>

<style scoped>

</style>