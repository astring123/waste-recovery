<template>
  <div class="order">
    <div class="table">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            label="订单号"
            width="80"
            align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="用户"
            align="center">
        </el-table-column>
        <el-table-column
            prop="type"
            label="废品类型"
            align="center">
        </el-table-column>
        <el-table-column
            prop="img"
            label="废品照片"
            width="90"
            align="center">
          <template slot-scope="scope">
            <img style='width: 80px;height: 80px;'
                 :src="`http://localhost:8000/${scope.row.img}`"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="weight"
            label="重量（kg）"
            align="center">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            align="center">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            align="center">
        </el-table-column>
        <el-table-column
            prop="time"
            label="上门时间"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"
            width="100"
            align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="receive(scope.row.id)">接单</el-button>
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
          :page-size="pageSize"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {apiGetMissOrder, apiUpdateOrder} from "../../api";

export default {
  name: "order",
  data(){
    return{
      tableData:[],
      currentPage: 0,
      pageSize: 8,
      total: 0,
      user_id: 0,
    }
  },
  created(){
    let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
    this.user_id = info.id
    this.getOrder(1)
  },
  watch:{
    currentPage(val){
      this.getOrder(val)
    }
  },
  methods:{
    //获取未被接单的订单列表
    getOrder(page){
      let params = {
        pageNum: page,
        pageSize: this.pageSize,
        id: this.user_id
      }
      let res = apiGetMissOrder(params)
      res.then(data => {
        console.log(data)
        data.result.forEach(item => {
          item.time = item.time.replace('T', ' ')
          item.time = item.time.replace('.000Z', '')
        })
        this.tableData = data.result
        this.total = data.total
      })
    },
    //接单
    receive(id){
      let params = {
        id,
        recycler_id: this.user_id
      }
      let res = apiUpdateOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('接单成功，详情请到我的订单中查看')
        this.getOrder(this.currentPage)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order{
  padding: 20px;

  .bottom{
    text-align: center;
    margin-top: 20px;
  }
}
</style>