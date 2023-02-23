<template>
  <div class="classification">
    <!--选择器-->
    <div class="top">
      <el-select v-model="type" placeholder="请选择类型">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <div class="price">
        价格:
        <div v-if="type" class="num">{{ price }}</div>
        <div v-else>--</div>
        元/斤
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <div
        class="content-item"
        v-for="item in wasteList">
        <el-card>
          <div class="img">
            <img :src="`http://localhost:8000/${item.img}`" />
          </div>
          <div class="name">名称：{{item.name}}</div>
          <div class="type">类型：{{item.type}}</div>
          <div class="type">价格：{{item.price}}元</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {apiGetAllWaste} from "../../api";

export default {
  name: "classification",
  data(){
    return {
      options: [],
      type: '',
      wasteList: [],
      price: 0,
    }
  },
  created(){
    //获取全部废品类型
    let res = apiGetAllWaste()
    res.then(data => {
      console.log(data)
      let list = []
      data.result.list.forEach(item => {
        list.push({label:item.name, value:item.name })
      })
      this.options = list
      this.wasteList = data.result.list
    })
  },
  watch:{
    type(val){
      console.log(val)
      this.wasteList.forEach(item => {
        if(item.name == val){
          this.price = item.price.toFixed(2)
        }
      })
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
.classification{
  padding: 30px 10px 10px 10px;

  .top{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .price{
      display: flex;
      align-items: center;

      .num{
        color: rgb(79, 180, 197);
        font-size: 25px;
        min-width: 60px;
        text-align: center;
      }
    }
  }

  .content{
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .content-item{
      width: 30%;
      margin-bottom: 10px;
      margin-right: 3.333%;

      .img img{
        width: 100%;
        height: 300px;
      }
    }
  }
}
</style>