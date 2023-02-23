<template>
  <div class="userInfo">
    <div class="top">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search(0)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="openEdit(null)">添加用户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            label="id"
            align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="img"
            label="头像"
            align="center">
          <template slot-scope="scope">
            <img :src="`http://localhost:8000/${scope.row.img}`" style="width:60px;height:60px;"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            align="center">
        </el-table-column>
        <el-table-column
            prop="authority"
            label="类型"
            align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.authority=='user'">普通用户</div>
            <div v-else-if="scope.row.authority=='recycler'">回收员</div>
            <div v-else-if="scope.row.authority=='admin'">管理员</div>
          </template>
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            align="center">
        </el-table-column>
        <el-table-column
            prop="createdAt"
            label="创建时间"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"
            align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <!--分页-->
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="8"
          :total="total">
      </el-pagination>
    </div>
    <user-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      :info="info"
      @refresh="refresh">
    </user-edit>
  </div>
</template>

<script>
import {
  apiGetUserList,
  apiSearchUser,
  apiRemoveUser,
} from "../../api";
import UserEdit from '@/components/admin/user/edit-user.vue'

export default {
  name: "userInfo",
  components:{
    UserEdit
  },
  data(){
    return{
      form:{
        type: 'all',
      },
      options:[
        {value: 'all', label: '全部'},
        {value: 'user', label: '普通用户'},
        {value: 'recycler', label: '回收员'},
        {value: 'admin', label: '管理员'},
      ],
      tableData:[],
      isOpen: false,
      isSearch: false,//是否为搜索状态
      info:{},
      currentPage: 0,//当前页码
      pageSize: 8,//每页数据数
      total: 0,//数据总数
    }
  },
  created(){
    this.getUserList(0)
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search(val)
      }else{
        this.getUserList(val)
      }
    }
  },
  methods:{
    //获取用户列表
    getUserList(page){
      let params = {
        pageNum: page,
        pageSize: 8,
      }
      let res = apiGetUserList(params)
      res.then(data => {
        console.log(data)
        let list = data.result.list
        list.forEach(item => {
          item.createdAt = item.createdAt.replace('T', ' ')
          item.createdAt = item.createdAt.replace('.000Z', '')
        })
        this.tableData = list
        this.total = data.result.total
      })
    },
    //删除用户
    remove(id){
      let res = apiRemoveUser({id})
      res.then(data => {
        console.log(data)
        this.$message.success('删除成功')
        this.getUserList(this.currentPage)
      })
    },
    //添加/编辑用户
    openEdit(obj){
      this.info = obj
      this.isOpen = true
    },
    //搜索按钮
    search(page){
      console.log('搜索')
      let params = {
        username: this.form.username,
        authority: this.form.type,
        pageSize: 5,
        pageNum: page,
      }
      console.log(params)
      let res = apiSearchUser(params)
      res.then(data => {
        console.log(data)
        let list = data.result.list
        list.forEach(item => {
          item.createdAt = item.createdAt.replace('T', ' ')
          item.createdAt = item.createdAt.replace('.000Z', '')
        })
        this.tableData = list
        this.total = data.result.total
        this.$message.success('搜索成功')
        this.isSearch = true
      })
    },
    //关闭添加/编辑用户弹框
    closeEdit(){
      this.id = ''
      this.isOpen = false
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getUserList(this.currentPage)
    },
  }
}
</script>

<style lang="less" scoped>
.userInfo{
  padding: 20px;

  .bottom{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>