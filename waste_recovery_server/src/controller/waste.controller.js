const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { 
    fileUploadError, 
    unSupportedFileType, 
} = require('../constants/err.type')

const {
    createWaste,
    getAllWasteInfo,
    updateWasteById,
    searchWaste,
    removeWaste,
} = require('../service/waste.service')

class WasteController{

    //获取全部废品信息
    async getAllWasteInfo(ctx,next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAllWasteInfo(pageNum, pageSize)
        
        // console.log('废品类型',res.list[0].dataValues)

        ctx.body = {
            code: 0,
            message: '获取全部废品信息成功',
            result: res
        }
    }

    //获取全部废品类型
    async getWasteType(ctx,next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAllWasteInfo(pageNum, pageSize)

        // console.log('废品类型',res)

        let arr = []
        res.list.forEach(item => {
            // console.log('item',item.dataValues)
            if(arr.indexOf(item.dataValues.type)==-1){
                arr.push(item.dataValues.type)
            }
        })
        ctx.body = {
            code: 0,
            message: '获取全部废品类型成功',
            result: arr
        }
    }

    // 添加订单
    async createWaste(ctx,next){
        const { name,type,img,price } = ctx.request.body
        let wasteInfo = {
            name,type,img,price
        }
        let res = await createWaste(wasteInfo)
        ctx.body = {
            code: 0,
            message: '添加废品成功',
            result: res
        }
    }

    // 废品图片上传
    async upload(ctx, next){
        // console.log(ctx.request.files.file) //file这个属性要与上传图片请求当中的key相同
        const {file} = ctx.request.files
        console.log(file)
        const fileType = ['image/jpeg','image/png']
        if(file){
            if(!fileType.includes(file.mimetype)){
                console.error('上传文件格式不支持')
                return ctx.app.emit('error',unSupportedFileType)
            }
            ctx.body = {
                code: 0,
                message: '废品图片上传成功',
                result: {
                    user_img: path.basename(file.filepath)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    // 根据用户id修改用户信息
    async updateWasteById(ctx,next){

        // const id = ctx.request.params.id
        const { id,type,name,img,price } = ctx.request.body

        let obj = {}
        type && Object.assign(obj, {type})
        name && Object.assign(obj, {name})
        img && Object.assign(obj, {img})
        price && Object.assign(obj, {price})
        
        console.log('获取到的参数：',obj)

        let res = await updateWasteById(id,obj)

        ctx.body = {
            code: 0,
            message: '修改废品图鉴信息成功',
            result: res
        }
    }

    // 条件查询废品图鉴
    async searchWaste(ctx,next){
        const {pageNum, pageSize, name, type} = ctx.request.body

        console.log(pageNum, pageSize, name, type)
        
        let res = await searchWaste(pageNum, pageSize, name, type)
        
        ctx.body = {
            code: 0,
            message: '获取废品图鉴信息成功',
            result: res
        }
    }

     // 删除废品图鉴
     async removeWaste(ctx,next){

        const { id } = ctx.request.body
        console.log(id)

        // 再删除user表中的数据
        let res = await removeWaste(id)

        ctx.body = {
            code: 0,
            message: '删除废品图鉴信息成功',
            result: res
        }
    }
}



module.exports = new WasteController()