<template>
  <div class="announcement">
    <div class="top">
      <el-button type="success" @click="openDetails({})">添加公告</el-button>
    </div>
    <div class="table">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            width="50"
            align="center"
            label="序号">
        </el-table-column>
        <el-table-column
            prop="content"
            align="center"
            label="公告内容">
        </el-table-column>
        <el-table-column
            prop="operation"
            align="center"
            width="200"
            label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="openDetails(scope.row)">编辑</el-button>
            <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <announcement-edit
        :isOpen="isOpen"
        @closeEdit="closeEdit"
        :info="info"
        @refresh="refresh"
    ></announcement-edit>
  </div>
</template>

<script>
import AnnouncementEdit from '@/components/admin/announcement/announcement-edit.vue'
import {apiGetAnn, apiRemoveAnn} from "../../api";

export default {
  name: "announcement",
  components:{
    AnnouncementEdit
  },
  data(){
    return{
      tableData:[],
      info:{
        content: '',
      },
      isOpen: false,
    }
  },
  created(){
    this.getAnnList()
  },
  methods:{
    //获取公告列表
    getAnnList(){
      let data = apiGetAnn()
      data.then(res => {
        this.tableData = res.result
        console.log(res)
      })
    },
    //添加/编辑用户
    openDetails(obj){
      this.info = obj
      this.isOpen = true
    },
    //关闭添加/编辑用户弹框
    closeEdit(){
      this.info = {
        content: ''
      }
      this.isOpen = false
    },
    //删除公告
    remove(id){
      let params = {id}
      let res = apiRemoveAnn(params)
      res.then(data => {
        console.log(data)
        this.$message.success('删除公告成功')
        this.getAnnList()
      })
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getAnnList()
    },
  }
}
</script>

<style lang="less" scoped>
.announcement{
  height: 900px;
  overflow-y: auto;
  padding: 10px;

  .top{
    margin-bottom: 20px;
  }

  .bottom{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>