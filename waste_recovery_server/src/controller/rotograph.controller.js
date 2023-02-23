const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const {
    createRotograph,
    getRotograph,
    removeRotograph
} = require('../service/rotograph.service')


class RotographController{

    // 添加轮播图
    async createRotograph(ctx,next){
        const { img } = ctx.request.body
        let info = { img }

        let res = await createRotograph(info)

        ctx.body = {
            code: 0,
            message: '添加轮播图成功',
            result: res
        }
        
    }

    // 获取轮播图列表
    async getRotograph(ctx,next){

        let res = await getRotograph()

        ctx.body = {
            code: 0,
            message: '获取轮播图列表成功',
            result: res
        }
    }

    // 删除轮播图
    async removeRotograph(ctx,next){

        const { id } = ctx.request.body
        console.log(id)

        let res = await removeRotograph(id)

        ctx.body = {
            code: 0,
            message: '删除轮播图成功',
            result: res
        }
    }
}

module.exports = new RotographController()