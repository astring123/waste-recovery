<template>
  <div class="recycler">
    <el-card class="top">
      <div class="title">如何成为回收员？</div>
      <div class="text">
        想要成为回收员，请填写下方申请资料，待后台审核成功后即可升级成为系统的回收员，审核时间大概1-3个工作日。
      </div>
    </el-card>
    <el-card class="bottom">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="真实姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="form.id_card"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面">
          <upload
              :isOpen="isOpen"
              :type="'img'"
              :path="imgPath"
              :form="form"
              @getImgPath="getFrontImgPath"
          ></upload>
        </el-form-item>
        <el-form-item label="身份证背面">
          <upload
              :isOpen="isOpen"
              :type="'img'"
              :path="imgPath"
              :form="form"
              @getImgPath="getBackImgPath"
          ></upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {apiRecyclerApply} from "../../api";
import Upload from '@/components/upload'

export default {
  name: "recycler",
  components:{
    Upload,
  },
  data(){
    return{
      form:{},
      imageUrl:'',
      imgPath: 'http://localhost:8080/order/upload',//图片上传的路径
      isOpen: true,
    }
  },
  methods:{
    //创建
    onSubmit(){
      let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
      this.form.user_id = info.id
      this.form.username = info.username
      console.log(this.form)
      let res = apiRecyclerApply(this.form)
      res.then(data => {
        console.log(data)
        if(data.code == 0){
          this.$message.success('提交申请成功')
        }else{
          this.$message.warning('已提交过申请，请勿重复提交')
        }
      })
    },
    //获取身份证正面图片路径
    getFrontImgPath(path){
      this.form.front_img = path
    },
    //获取身份证背面图片路径
    getBackImgPath(path){
      this.form.back_img = path
    },
  }
}
</script>

<style lang="less" scoped>
.recycler{
  padding: 10px;

  .top{
    margin-bottom: 20px;

    .title{
      font-weight: bold;
      font-size: 23px;
      margin-bottom: 15px;
    }
  }
}


/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>