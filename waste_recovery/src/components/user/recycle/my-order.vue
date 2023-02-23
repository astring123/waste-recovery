<template>
  <el-dialog
    width="90%"
    title="我的订单"
    :visible.sync="isOpen"
    :before-close="cancel">
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
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
          prop="img"
          label="废品照片">
        <template slot-scope="scope">
          <img style='width: 80px;height: 80px;'
               :src="`http://localhost:8000/${scope.row.img}`"/>
        </template>
      </el-table-column>
      <el-table-column
          prop="time"
          label="上门时间">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.state == 'unsuccessful'">未接单</div>
          <div v-else-if="scope.row.state == 'unfinished'">未完成</div>
          <div v-else-if="scope.row.state == 'finish'">已完成</div>
        </template>
      </el-table-column>
      <el-table-column
          prop="recycler"
          label="回收员">
      </el-table-column>
      <el-table-column
          prop="recyclerPhone"
          label="回收员电话">
      </el-table-column>
      <el-table-column
          prop="state"
          width="200"
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row.id)" type="danger">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {apiGetOrderByUserId, apiRemoveOrder} from "../../../api";

export default {
  name: "my-order",
  props:{
    isOpen: {
      type: Boolean,
    }
  },
  data(){
    return {
      tableData:[],
      currentPage: 0,//当前页码
      pageSize: 5,//每页数据数
      total: 0,//数据总数
    }
  },
  created(){
    this.getOrder(0)
  },
  watch:{
    currentPage(val){
      this.getOrder(val)
    }
  },
  methods: {
    //获取我的订单列表
    getOrder(page){
      let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
      let user_id = info.id
      let params = {
        pageNum: page,
        pageSize: this.pageSize,
        user_id
      }
      console.log(params)
      let res = apiGetOrderByUserId(params)
      res.then(data => {
        console.log(data)
        data.result.forEach(item => {
          item.time = item.time.replace('T15:', ' ')
          item.time = item.time.replace('.000Z', '')
        })
        this.tableData = data.result
        this.total = data.total
      })
    },
    //删除订单
    remove(id){
      let params = {id}
      let res = apiRemoveOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('取消订单成功')
        this.getOrder(this.currentPage)
      })
    },
    //取消
    cancel(){
      this.$emit('close')
    },
    //确定
    submit(){
      this.cancel()
    },
  }
}
</script>

<style lang="less" scoped>
.bottom{
  text-align: center;
  margin-top: 20px;
}
</style>