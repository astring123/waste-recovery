<template>
  <div class="index">
    <div class="rotograph">
      <el-carousel indicator-position="outside">
        <div v-for="item in imgList">
          <el-carousel-item  :key="item">
            <img :src="item" style="width:100%;height:100%;"/>
          </el-carousel-item>
        </div>
      </el-carousel>
    </div>
    <div class="content">
      <div class="announcement">
        <el-card>
          <div class="title">公告栏</div>
          <div class="announcement-content">
            <div v-for="(item,index) in announcement" class="announcement-item">
              <div style="margin-right: 10px;">{{index+1}}、</div>{{item.content}}
            </div>
          </div>
        </el-card>
      </div>
      <div class="list">
        <el-card>
          <div class="title">
            回收排行榜
          </div>
          <div class="list-content">
            <div v-for="(item,index) in list" class="list-item">
              <div class="left">
                <div class="index">{{index+1}}、</div>
                <div class="img">
                  <img :src="`http://localhost:8080/${item.img}`"/>
                </div>
                <div class="username">{{item.username}}</div>
              </div>
              <div class="right">{{item.weight}}kg</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {apiGetAnn, apiGetBest, apiGetRot} from "../../api";

export default {
  name: "index",
  data(){
    return {
      imgList: [],
      announcement:[],
      list:[]
    }
  },
  created(){
    this.getRotList()
    this.getAnnList()
    this.getBest()
  },
  methods:{
    //获取轮播图列表
    getRotList(){
      let data = apiGetRot()
      data.then(res => {
        console.log(res)
        let list =  []
        res.result.forEach(item => {
          list.push(item.img)
        })
        this.imgList = list
      })
    },
    //获取公告列表
    getAnnList(){
      let data = apiGetAnn()
      data.then(res => {
        console.log(res)
        let list = []
        res.result.forEach(item => {
          list.push({content: item.content})
        })
        this.announcement = list.reverse()
      })
    },
    //获取排行榜用户列表
    getBest(){
      let data = apiGetBest()
      data.then(res => {
        console.log(res)
        this.list = res.result
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index{
    max-width: 100%;

  .rotograph{
    padding: 10px;
    margin-bottom: 5px;
  }

  .content{
    padding: 0 10px;
    display: flex;
    justify-content: space-around;

    .announcement{
      width: 49%;
      height: 600px;

      .title{
        display: flex;
        justify-content: left;
        font-weight: bold;
        font-size: 25px;
        margin-bottom: 15px;
      }

      .announcement-content{
        overflow-y: auto;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        height: 400px;

        .announcement-item{
          width: 100%;
          text-align: left;
          min-height: 39px;
          line-height: 23px;
          font-size: 18px;
          display: flex;
          margin-bottom: 10px;
        }
      }
    }

    .list{
      width: 49%;

      .title{
        display: flex;
        justify-content: left;
        font-weight: bold;
        font-size: 25px;
        margin-bottom: 15px;
        margin-bottom: 20px;
      }

      .list-content{
        width: 100%;
        height: 395px !important;

        .list-item{
          width: 100%;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          //border-top: 1px solid #b3b4b5;

          .left{
            display: flex;
            align-items: center;

            .img img{
              width: 60px;
              height: 60px;
              margin: 0 20px 0 20px;
            }
          }
        }
      }
    }
  }
}
</style>