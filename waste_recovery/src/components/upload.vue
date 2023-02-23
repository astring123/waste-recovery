<template>
  <!--图片上传-->
  <el-upload
      class="avatar-uploader"
      :action="path"
      :show-file-list="false"
      :on-success="handleImgSuccess"
      :before-upload="beforeUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import {
  apiUploadOrderImg
} from '@/api/index.js'

export default {
  name: "upload",
  props:{
    path:{
      type: String,
      default: '',
    },
    isOpen:{
      type: Boolean,
      efault: () => {
        return false
      }
    },
    id:{
      type: String,
      default: () => {
        return ''
      }
    },
    img: {
      type: String,
    }
  },
  data(){
    return {
      imageUrl: '',//图片路径
    }
  },
  computed:{
    isUploadOpen(){
      this.imageUrl = this.img
      return this.isOpen
    }
  },
  watch:{
    isOpen(val){
      if(!val){ //关闭
        this.imageUrl = ''
      }
    },
    isUploadOpen(val){},
  },
  methods:{
    //上传图片成功触发
    handleImgSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = res.result.user_img
      this.$emit('getImgPath',res.result.user_img)
    },
    //上传前触发
    beforeUpload(file, type) {
      console.log(file,type)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreviewMusic(file) {
      console.log(file);
    },
    //文件超出个数限制时的钩子
    handleExceedMusic(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>