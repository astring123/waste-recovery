<template>
  <div class="receive">
    <div class="top">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="订单类型">
          <el-select v-model="type" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="list" v-if="this.receiveList.length > 0">
      <el-card
        style="width: 100%;margin-bottom: 10px;"
        v-for="(item,index) in receiveList"
        :key="index">
        <div class="list-item">
          <div class="item-left">
            <div class="img">
              <img :src="`http://localhost:8080/${item.img}`"/>
            </div>
            <div class="info">
              <div class="item">
                <div class="info-item">订单号：{{ item.id }}</div>
                <div class="info-item">状态：{{item.state == 'unfinished' ? '代办' : '已完成'}}</div>
              </div>
              <div class="item">
                <div class="info-item">姓名：{{ item.name }}</div>
                <div class="info-item">手机号：{{ item.phone }}</div>
                <div class="info-item">废品类型：{{ item.type }}</div>
                <div class="info-item">重量（kg）：{{ item.weight }}</div>
                <div class="info-item">上门时间：{{ item.time }}</div>
              </div>
              <div class="item">
                <div class="address">地址：{{ item.address }}</div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <div v-if="item.state=='unfinished'">
              <div>
                <el-button type="primary" @click="cancelOrder(item.id)">取消订单</el-button>
              </div>
              <div>
                <el-button type="success" @click="finishOrder(item.id)"> 已完成 </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else style="text-align: center;margin-bottom: 50px;">暂无订单</div>
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
import {apiGetOrderByRecyclerId, apiUpdateOrder} from "../../api";

export default {
  name: "receive",
  data(){
    return {
      form:{},
      type: 'all',
      options:[
        {value: 'all', label: '全部'},
        {value: 'agent', label: '代办'},
        {value: 'finish', label: '已完成'},
      ],
      receiveList:[],
      currentPage: 0,
      pageSize: 8,
      total: 0,
      user_id: 0,
    }
  },
  created(){
    let info = JSON.parse(localStorage.getItem('userInfo'))//获取本地缓存中的用户信息
    this.user_id = info.id
    this.getData(1)
  },
  watch:{
    //页码改变
    currentPage(val){
      this.getData(val)
    },
    //类型改变时页码变回 1 开始
    type(val){
      this.currentPage = 1
      this.getData(this.currentPage)
    }
  },
  methods:{
    //获取订单列表
    getData(page){
      let params = {
        pageNum: page,
        pageSize: this.pageSize,
        recycler_id: this.user_id,
        type: this.type
      }
      let res = apiGetOrderByRecyclerId(params)
      res.then(data => {
        console.log(data)
        data.result.forEach(item => {
          item.time = item.time.replace('T', ' ')
          item.time = item.time.replace('.000Z', '')
        })
        this.receiveList = data.result
        this.total = data.total
      })
    },
    //取消订单
    cancelOrder(id){
      let params = {
        id,
        recycler_id: -1,
      }
      let res = apiUpdateOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('取消订单成功')
        this.getData(this.currentPage)
      })
    },
    //已完成订单
    finishOrder(id){
      let params = {
        id,
        state: 'finish'
      }
      let res = apiUpdateOrder(params)
      res.then(data => {
        console.log(data)
        this.$message.success('订单已完成')
        this.getData(this.currentPage)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.receive{
  padding: 20px;

  .list-item{
    width: 100%;
    display: flex;
    justify-content: space-between;

    .item-left {
      width: 80%;
      display: flex;

      .img img{
        width: 150px;
        height: 100%;
      }

      .info{
        flex: 1;
        height: 100%;
        padding-left: 10px;

        .item{
          display: flex;
          margin-bottom: 10px;

          .info-item{
            width: 200px;
            margin-right: 20px;
          }

          .address{
            width: 100%;
          }
        }
      }
    }

    .item-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .bottom{
    display: flex;
    justify-content: center;
  }
}

/deep/ .el-button--success {
  color: #FFF;
  background-color: #67C23A;
  border-color: #67C23A;
  width: 98px;
  margin-top: 10px;
}
</style>