const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { 
    fileUploadError, 
    unSupportedFileType, 
} = require('../constants/err.type')

const {
    createOrder,
    removeOrder,
    getAllOrder,
    getByUesrId,
    getCount,
    updateById,
    getByRecyclerId,
    searchOrder,
} = require('../service/order.service')

const {
    getUserById,
    getById
} = require('../service/user.service')

class OrderController{
    
    // 添加订单
    async createOrder(ctx,next){
        console.log('ctx.request.body',ctx.request.body)
        const { name,phone,address,type,weight,time,img,user_id } = ctx.request.body
        let orderInfo = {
            name,phone,address,type,weight,time,img,user_id
        }
        console.log('订单信息：',orderInfo)
        let res = await createOrder(orderInfo)
        ctx.body = {
            code: 0,
            message: '订单创建成功',
            result: res
        }
    }

    // 用户头像上传
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

    // 获取全部订单
    async getAllOrder(ctx, next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAllOrder(pageNum, pageSize)

        // 根据返回的用户id获取每个申请者的用户信息
        let list = res.list
        for(let i=0; i<res.list.length; i++){

            //分别拿到用户id和回收员id
            let user_id = list[i].user_id
            let recycler_id = list[i].recycler_id

            // 根据id获取用户和管理员的信息
            let userInfo = await getById(user_id)
            let recyclerInfo = await getById(recycler_id)

            console.log('用户信息',userInfo[0].dataValues)
            console.log('回收员信息',recyclerInfo[0])

            // 将信息存入对象
            list[i].dataValues.userInfo = userInfo[0].dataValues
            if(recyclerInfo[0] != undefined){ //如果已接单存在回收员id，则存入回收员信息
                list[i].dataValues.recyclerInfo = recyclerInfo[0].dataValues
            }
        }

        res.list = list

        ctx.body = {
            code: 0,
            message: '获取订单成功',
            result: res
        }
    }

    // 条件搜索订单
    async searchOrder(ctx,next){
            const {pageNum, pageSize, id, state} = ctx.request.body
    
            console.log(pageNum, pageSize, id, state)
            
            let res = await searchOrder(pageNum, pageSize, id, state)
            
             // 根据返回的用户id获取每个申请者的用户信息
             let list = res.list
             for(let i=0; i<res.list.length; i++){
                 let id = list[i].user_id
                 let userInfo = await getById(id)
                 console.log('userInfo',userInfo[0].dataValues)
                 list[i].dataValues.userInfo = userInfo[0].dataValues
             }
     
             res.list = list
             console.log('返回结果',res.list)
     
             ctx.body = {
                 code: 0,
                 message: '搜索订单申请列表成功',
                 result: res
             }
    }

    // 获取未被接单的订单
    async getMissOrder(ctx, next){
        const {pageNum, pageSize, id} = ctx.request.body

        let count = await getCount() //获取数据条数
        let allOrder = await getAllOrder(1, count) //获取全部订单
        console.log('allOrder',allOrder)

        let arr = []
        // 遍历订单列表，将未接单的订单存入新数组中
        allOrder.list.forEach(item => {
            console.log(item.state)
            if(item.state == 'unsuccessful'){
                arr.push(item)
            }
        })

        let start = pageNum == 1 ? pageNum-1 : pageNum*pageSize-1
        let end = start + pageSize
        let res = arr.slice(start,end)

        ctx.body = {
            code: 0,
            message: '获取未被接单订单成功',
            result: res,
            total: arr.length
        }
    }

    // 根据用户id获取订单
    async getByUesrId(ctx){
        const { pageNum, pageSize,user_id } = ctx.request.body
        let orderList = await getByUesrId(user_id)
        console.log(orderList)

        orderList.forEach((item,index) => {
            // 如果订单已接单或者已完成，则根据回收员id获取回收员信息
            if(item.recycler_id){
                let userInfo = getUserById(item.recycler_id)
                item.recycler_info = userInfo
            }
        })

        let count = await getCount()

        if(!pageSize) pageSize = count
        let start = pageNum == 1 ? pageNum-1 : pageNum*pageSize-1
        let end = start + pageSize
        let res = orderList.slice(start,end)

        ctx.body = {
            code: 0,
            message: '获取订单列表成功',
            result: res,
            total: orderList.length
        } 
    }

    // 根据回收员id获取订单
    async getByRecyclerId(ctx){
        const { pageNum, pageSize, recycler_id, type } = ctx.request.body

        let orderList = await getByRecyclerId(recycler_id)
        console.log(orderList)

        let list = []
        // 拿到目前所选类型的订单（全部/代办/已完成）
        if(type=='agent'){ //代办
            orderList.forEach(item => {
                if(item.state == 'unfinished'){
                    list.push(item)
                }
            })
        }else if(type=='finish'){ //已完成
            orderList.forEach(item => {
                if(item.state == 'finish'){
                    list.push(item)
                }
            })
        }else{ //全部
            list = orderList
        }
        

        // 获取每个订单的用户的信息
        list.forEach((item,index) => { 
            let userInfo = getUserById(item.user_id)
            item.user_info = userInfo
        })

        let start = pageNum == 1 ? pageNum-1 : pageNum*pageSize-1
        let end = start + pageSize
        let res = list.slice(start,end)

        ctx.body = {
            code: 0,
            message: '获取订单列表成功',
            result: res,
            total: list.length
        } 
    }
    
    // 根据订单id修改订单信息
    async updateOrderById(ctx,next){

        // const id = ctx.request.params.id
        let { id,recycler_id,name,phone,type,weight,address,img,time,state } = ctx.request.body


        console.log('recycler_id',recycler_id)
        if(recycler_id != -1 && !state){
            state = 'unfinished' //如果是接单，则修改订单状态为unfinished
        }else if(recycler_id == -1){
            state = 'unsuccessful' //如果是取消订单，则修改订单状态为unsuccessful
        }

        let obj = {}
        recycler_id && Object.assign(obj, {recycler_id})
        name && Object.assign(obj, {name})
        phone && Object.assign(obj, {phone})
        type && Object.assign(obj, {type})
        weight && Object.assign(obj, {weight})
        address && Object.assign(obj, {address})
        img && Object.assign(obj, {img})
        time && Object.assign(obj, {time})
        state && Object.assign(obj, {state})

        console.log('获取到的参数：',obj)

        let res = await updateById(id,obj)

        ctx.body = {
            code: 0,
            message: '修改订单信息成功',
            result: res
        }
    }

    // 根据用户id删除用户
    async removeOrder(ctx,next){

        const { id } = ctx.request.body
        console.log(id)

        // 再删除user表中的数据
        let res = await removeOrder(id)

        ctx.body = {
            code: 0,
            message: '删除订单信息成功',
            result: res
        }
    }
}



module.exports = new OrderController()