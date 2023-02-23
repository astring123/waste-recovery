<template>
  <div class="rotograph">
    <div class="top">
      <el-button type="success" @click="openDetails({})">添加轮播图</el-button>
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
            prop="img"
            align="center"
            label="轮播图">
          <template slot-scope="scope">
            <img
                :src="`http://localhost:8080/${scope.row.img}`"
                 style="width: 300px;height: 150px;"
            />
          </template>
        </el-table-column>
        <el-table-column
            prop="operation"
            align="center"
            width="200"
            label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <rotograph-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      @refresh="refresh"
    ></rotograph-edit>
  </div>
</template>

<script>
import {apiGetRot, apiRemoveRot} from "../../api";
import RotographEdit from '@/components/admin/rotograph/rotograph-edit.vue'

export default {
  name: "rotograph",
  components:{
    RotographEdit
  },
  data(){
    return{
      tableData:[],
      isOpen: false,
    }
  },
  created(){
    this.getRotList()
  },
  methods:{
    //获取轮播图列表
    getRotList(){
      let data = apiGetRot()
      data.then(res => {
        console.log('触发')
        this.tableData = res.result
        console.log(res)
      })
    },
    //添加添加轮播图
    openDetails(){
      this.isOpen = true
    },
    //关闭弹框
    closeEdit(){
      this.isOpen = false
    },
    //删除轮播图
    remove(id){
      let params = {id}
      let res = apiRemoveRot(params)
      res.then(data => {
        console.log(data)
        this.$message.success('删除轮播图成功')
        this.getRotList()
      })
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getRotList()
    },
  }
}
</script>

<style lang="less" scoped>
.rotograph{
  height: 900px;
  overflow-y: auto;
  padding: 10px;

  .top{
    width: 100%;
  }

  .table{
    width: 100%;
    margin: 20px 0;
  }

}
</style>