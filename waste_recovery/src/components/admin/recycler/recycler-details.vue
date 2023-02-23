<template>
  <el-dialog
      title="申请信息详情"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像" :label-width="width">
        <img v-if="form.userInfo.img" :src="`http://localhost:8080/${form.userInfo.img}`"/>
      </el-form-item>
      <el-form-item label="用户名" :label-width="width">
        <div v-if="form.username">{{form.username}}</div>
      </el-form-item>
      <el-form-item label="姓名" :label-width="width">
        <div v-if="form.name">{{form.name}}</div>
      </el-form-item>
      <el-form-item label="电话" :label-width="width">
        <div v-if="form.userInfo.phone">{{form.userInfo.phone}}</div>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="width">
        <div v-if="form.id_card">{{form.id_card}}</div>
      </el-form-item>
      <el-form-item label="身份证正面" :label-width="width">
        <img v-if="form.front_img" :src="`http://localhost:8080/${form.front_img}`"/>
      </el-form-item>
      <el-form-item label="身份证反面" :label-width="width">
        <img v-if="form.back_img" :src="`http://localhost:8080/${form.back_img}`"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="submit">同意</el-button>
      <el-button type="danger" @click="cancel">拒绝</el-button>
      <el-button @click="cancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "recycler-details",
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
      form:{
        userInfo:{
          img: '',
        }
      },//表单
      width: '100px',//标题宽度
    }
  },
  watch:{
    info(val){
      this.form = val
      console.log('申请信息',this.form)
    }
  },
  methods:{
    //关闭
    cancel(){
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
  }
}
</script>

<style lang="less" scoped>
img{
  width: 80px;
  height: 80px;
}
</style>