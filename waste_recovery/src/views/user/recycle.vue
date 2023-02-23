<template>
  <div class="recycle">
    <div class="top">
      <div class="title">现有工单列表</div>
      <div class="btn">
        <el-button @click="isOrder = true" type="success">我的订单</el-button>
        <el-button @click="isCreate = true" type="primary">新建工单</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            type="index"
            align="center"
            width="100"
            label="序号">
        </el-table-column>
        <el-table-column
            prop="name"
            label="用户">
        </el-table-column>
        <el-table-column
            prop="type"
            label="废品类型">
        </el-table-column>
        <el-table-column
            prop="weight"
            label="重量（kg）">
        </el-table-column>
        <el-table-column
            prop="time"
            label="上门时间">
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
    <create
      :isOpen="isCreate"
      @close="closeCreate"
      @refresh="refresh">
    </create>
    <my-order
      :isOpen="isOrder"
      @close="closeOrder"
      @refresh="refresh">
    </my-order>
  </div>
</template>

<script>
import Create from '@/components/user/recycle/create'
import MyOrder from '@/components/user/recycle/my-order'
import {apiGetOrder} from "../../api";

export default {
  name: "recycle",
  components:{
    Create,
    MyOrder
  },
  data(){
    return {
      tableData:[],
      isCreate: false,
      isOrder: false,
      currentPage: 0,//当前页码
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
  methods:{
    //获取页码对应的订单数据
    getOrder(page){
      let params = {
        pageNum: page,
        pageSize: 8,
      }
      let res = apiGetOrder(params)
      res.then(data => {
        console.log(data)
        let list = data.result.list
        list.forEach(item => {
          item.time = item.time.replace('T15:', ' ')
          item.time = item.time.replace('.000Z', '')
        })
        this.tableData = list
        this.total = data.result.total
      })
    },
    closeCreate(){
      this.isCreate = false
    },
    closeOrder(){
      this.isOrder = false
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getOrder(this.currentPage)
    },
  }
}
</script>

<style lang="less" scoped>
.recycle{
  padding: 10px;

  .top{
    display: flex;
    justify-content: space-between;

    .title{
      font-size: 21px;
    }
  }

  .bottom{
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>