<template>
  <div class="order">
    <div class="top">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="订单号">
          <el-input v-model="form.id"></el-input>
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
      </el-form>
    </div>
    <div class="table">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            label="订单号">
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户">
        </el-table-column>
        <el-table-column
            prop="type"
            label="废品类型">
        </el-table-column>
        <el-table-column
            prop="weight"
            label="重量">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态"
            width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 'unsuccessful'">未接单</div>
            <div v-else-if="scope.row.state == 'unfinished'">未完成</div>
            <div v-else-if="scope.row.state == 'finish'">已完成</div>
          </template>
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"un dev
            width="250">
          <template slot-scope="scope">
            <el-button type="primary" @click="openDetails(scope.row)">详情</el-button>
            <el-button type="danger" @click="finish(scope.row.id)">删除</el-button>
            <el-button
                type="success"
                v-if="scope.row.state!='finish'"
                @click="finish(scope.row.id)">
              完成
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="5"
          :total="total">
      </el-pagination>
    </div>
    <order-details
        :isOpen="isOpen"
        @closeEdit="closeEdit"
        :info="info"
        @refresh="refresh">
    </order-details>
  </div>
</template>

<script>
import {
  apiGetOrder,
  apiSearchOrder,
  apiUpdateOrder,
  apiRemoveOrder
} from "../../api";
import OrderDetails from '@/components/admin/order/details.vue'

export default {
  name: "order",
  components:{
    OrderDetails
  },
  data(){
    return{
      form:{
        type: 'all'
      },
      options:[
        {value: 'all', label: '全部'},
        {value: 'unsuccessful', label: '未接单'},
        {value: 'unfinished', label: '已接单'},
        {value: 'finish', label: '已完成'},
      ],
      tableData:[],
      currentPage: 0,//当前页码
      total: 0,//数据总数
      isOpen: false,
      isSearch: false,//是否为搜索状态
      info: {},//订单信息
    }
  },
  created(){
    this.getOrderList(0)
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search(val)
      }else{
        this.getOrderList(val)
      }
    }
  },
  methods:{
    //获取用户列表
    getOrderList(page){
      let params = {
        pageNum: page,
        pageSize: 8,
      }
      let res = apiGetOrder(params)
      res.then(data => {
        console.log(data)
        let list = data.result.list
        list.forEach(item => {
          item.createdAt = item.createdAt.replace('T', ' ')
          item.createdAt = item.createdAt.replace('.000Z', '')
          item.username = item.userInfo.username
        })
        this.tableData = list
        this.total = data.result.total
      })
    },
    //删除
    remove(id){
      let params = {id}
      let res = apiRemoveOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('删除订单成功')
        this.getOrderList(this.currentPage)
      })
    },
    //完成订单
    finish(id){
      let params = {id, state: 'finish'}
      let res = apiUpdateOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('订单已完成')
        this.getOrderList(this.currentPage)
      })
    },
    //添加/编辑用户
    openDetails(obj){
      this.info = obj
      this.isOpen = true
    },
    //搜索按钮
    search(page){
      console.log('搜索')
      let params = {
        id: this.form.id,
        state: this.form.type,
        pageSize: 5,
        pageNum: page,
      }
      console.log(params)
      let res = apiSearchOrder(params)
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
      this.info = {}
      this.isOpen = false
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getOrderList(this.currentPage)
    },
  }
}
</script>

<style lang="less" scoped>
.order{
  padding: 20px;

  .bottom{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>