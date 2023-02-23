const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const {
    createAnnouncement,
    getAnnouncement,
    updateAnnouncement,
    removeAnnouncement
} = require('../service/announcement.service')


class AnnouncementController{

    // 添加公告
    async createAnnouncement(ctx,next){
        const { content } = ctx.request.body
        let recyclerInfo = { content }

        let res = await createAnnouncement(recyclerInfo)

        ctx.body = {
            code: 0,
            message: '添加公告成功',
            result: res
        }
        
    }

    // 获取公告列表
    async getAnnouncement(ctx,next){

        let res = await getAnnouncement()

        ctx.body = {
            code: 0,
            message: '获取公告列表成功',
            result: res
        }
    }

    // 修改公告信息
    async updateAnnouncement(ctx,next){

       // const id = ctx.request.params.id
       const { id,content } = ctx.request.body

       let obj = {}
       content && Object.assign(obj, {content})
       
       console.log('获取到的参数：',obj)

       let res = await updateAnnouncement(id,obj)

       ctx.body = {
           code: 0,
           message: '修改公告信息成功',
           result: res
       }
    }

    // 删除公告
    async removeAnnouncement(ctx,next){

        const { id } = ctx.request.body
        console.log(id)

        let res = await removeAnnouncement(id)

        ctx.body = {
            code: 0,
            message: '删除公告成功',
            result: res
        }
    }
}

module.exports = new AnnouncementController()