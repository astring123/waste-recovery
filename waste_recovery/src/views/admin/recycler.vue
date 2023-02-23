<template>
  <div class="recycler">
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
      </el-form>
    </div>
    <div class="table">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            label="id">
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名">
        </el-table-column>
        <el-table-column
            prop="createdAt"
            label="提交时间">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 'unaudited'">未审核</div>
            <div v-else-if="scope.row.state == 'pass'">通过</div>
            <div v-else-if="scope.row.state == 'refuse'">拒绝</div>
          </template>
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              style="margin-right:10px;"
              @click="details(scope.row)">
           详情</el-button>
            <!--未审核-->
            <span v-if="scope.row.state == 'unaudited'">
              <el-button type="success" @click="disposeApply(scope.row,'agreen')">同意</el-button>
              <el-button type="danger" @click="disposeApply(scope.row,'refuse')">拒绝</el-button>
            </span>
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
    <recycler-details
      @closeEdit="closeEdit"
      :isOpen="isOpen"
      :info="info">
    </recycler-details>
  </div>
</template>

<script>
import {apiDisposeApply, apiGetRecyclerList, apiSearchRecycler} from "../../api";
import RecyclerDetails from '@/components/admin/recycler/recycler-details.vue'

export default {
  name: "recycler",
  components:{
    RecyclerDetails
  },
  data(){
    return{
      form:{
        type: 'all'
      },
      options:[
        {value: 'all', label: '全部'},
        {value: 'unaudited', label: '未审核'},
        {value: 'pass', label: '通过'},
        {value: 'refuse', label: '拒绝'},
      ],
      tableData:[],
      currentPage: 0,//当前页码
      total: 0,//数据总数
      isOpen: false,//是否打开详情
      info:{},//当前所选行的申请信息对象
      isSearch: false,//是否为搜索状态
    }
  },
  created(){
    this.getRecyclerList(0)
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search(val)
      }else{
        this.getRecyclerList(val)
      }
    }
  },
  methods:{
    //获取申请了列表
    getRecyclerList(page){
      let params = {
        pageNum: page,
        pageSize: 8,
      }
      let res = apiGetRecyclerList(params)
      res.then(data => {
        console.log(data)
        data.result.list.forEach(item => {
          item.createdAt = item.createdAt.replace('T', ' ')
          item.createdAt = item.createdAt.replace('.000Z', '')
        })
        this.tableData = data.result.list
        this.total = data.result.total
      })
    },
    //搜索按钮
    search(page){
      console.log('搜索')
      let params = {
        user_id: this.form.user_id,
        username: this.form.username,
        state: this.form.type,
        pageSize: 5,
        pageNum: page,
      }
      console.log(params)
      let res = apiSearchRecycler(params)
      res.then(data => {
        console.log(data)
        let list = data.result.list
        list.forEach(item => {
          item.createdAt = item.createdAt.replace('T', ' ')
          item.createdAt = item.createdAt.replace('.000Z', '')
        })
        this.tableData = data.result.list
        this.total = data.result.total
        this.$message.success('搜索成功')
        this.isSearch = true
      })
    },
    //同意/拒绝申请
    disposeApply(info,type){
      console.log(info,type)
      let params = {
        info,
        type
      }
      let res = apiDisposeApply(params)
      res.then(data => {
        console.log(data)
        if(type=='agreen'){
          this.$message.success('申请管理员成功')
        }else{
          this.$message.success('拒绝管理员申请成功成功')
        }
      });
    },
    //关闭对话框
    closeEdit(){
      this.info = {
        userInfo:{
          img: '',
        }
      }
      this.isOpen = false
    },
    //点击详情
    details(info){
      this.isOpen = true
      this.info = info
    }
  }
}
</script>

<style lang="less" scoped>
.recycler{
  padding: 20px;

  .bottom{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>