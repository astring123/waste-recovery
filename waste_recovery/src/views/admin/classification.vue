<template>
  <div class="classification">
    <div class="top">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="废品名称">
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
          <el-button type="success" @click="openDetails({})">添加类型</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            label="序号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="img"
            label="图片">
          <template slot-scope="scope">
            <img :src="`http://localhost:8080/${scope.row.img}`" style="width:60px;height:60px;">
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="废品名称">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格(元/kg)">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="openDetails(scope.row)">编辑</el-button>
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
    <waste-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      :info="info"
      @refresh="refresh"
    ></waste-edit>
  </div>
</template>

<script>
import {apiGetAllWaste, apiGetWasteType, apiRemoveOrder, apiRemoveWaste, apiSearchWaste} from "../../api";
import WasteEdit from '@/components/admin/waste/waste-edit'

export default {
  name: "classification",
  components:{
    WasteEdit,
  },
  data(){
    return{
      form:{
        type: 'all'
      },
      options:[
        {value: 'all', label: '全部'}
      ],
      tableData:[],
      isOpen: false,
      isSearch: false,//是否为搜索状态
      info:{},
      currentPage: 0,//当前页码
      total: 0,//数据总数
    }
  },
  created(){
    this.getWasteType()
    this.getWasteList(0)
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search(val)
      }else{
        this.getWasteList(val)
      }
    }
  },
  methods:{
    //获取废品列表
    getWasteList(page){
      let params = {
        pageNum: page,
        pageSize: 8,
      }
      let res = apiGetAllWaste(params)
      res.then(data => {
        console.log(data)
        let list =  data.result.list
        this.tableData = list
        this.total = data.result.total
      })
    },
    //搜索按钮
    search(page){
      console.log('搜索')
      let params = {
        name: this.form.username,
        type: this.form.type,
        pageSize: 5,
        pageNum: page,
      }
      console.log(params)
      let res = apiSearchWaste(params)
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
    //获取废品类型
    getWasteType(){
      let data = apiGetWasteType()
      data.then(res => {
        console.log(res)
        res.result.forEach(item => {
          this.options.push({value: item, label: item})
        })
      })
    },
    //添加/编辑用户
    openDetails(obj){
      this.info = obj
      this.isOpen = true
    },
    //删除废品
    remove(id){
      let params = {id}
      let res = apiRemoveWaste(params)
      res.then(data => {
        console.log(data)
        this.$message.success('删除废品信息成功')
        this.getWasteList(this.currentPage)
      })
    },
    //关闭添加/编辑用户弹框
    closeEdit(){
      this.info = {}
      this.isOpen = false
    },
    //刷新列表
    refresh(arg){
      if(arg) {
        this.getWasteType()
        this.getWasteList(this.currentPage)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.classification{
  padding: 20px;

  .bottom{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>