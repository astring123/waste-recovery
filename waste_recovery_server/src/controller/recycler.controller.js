const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const {
    createRecycler,
    getRecyclerList,
    updateRecyclerById,
    searchRecycler,
    getByUserId
} = require('../service/recycler.service')

const {
    getById,
    updateById,
} = require('../service/user.service')

class RecyclerController{

    // 添加回收员申请
    async createRecycler(ctx,next){
        const { name,img,user_id,id_card,front_img,back_img,username } = ctx.request.body
        let recyclerInfo = {
            name,img,user_id,id_card,front_img,back_img,username
        }
        let hasUser = await getByUserId(user_id)
        console.log(hasUser)
        let message = '添加申请失败'
        let code = 500
        let res = {}
        if(!hasUser){ //如果已经存在用户信息(用户已经添加过一次申请)
            res = await createRecycler(recyclerInfo)
            code = 0
            message = '添加申请成功'
        }
        ctx.body = {
            code,
            message,
            result: res
        }
        
    }

    // 身份证照片上传
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
                message: '身份证照片上传成功',
                result: {
                    user_img: path.basename(file.filepath)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    // 获取回收员申请列表
    async getRecyclerList(ctx, next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getRecyclerList(pageNum, pageSize)

        console.log('申请列表：',res)

        // 根据返回的用户id获取每个申请者的用户信息
        let list = res.list
        for(let i=0; i<res.list.length; i++){
            let id = list[i].user_id
            console.log(id)
            let userInfo = await getById(id)
            console.log('userInfo',userInfo[0].dataValues)
            list[i].dataValues.userInfo = userInfo[0].dataValues
        }

        res.list = list
        console.log('返回结果',res.list)

        ctx.body = {
            code: 0,
            message: '获取回收员申请列表成功',
            result: res
        }
    }

    // 同意/拒绝申请
    async disposeApply(ctx, next){
        const {info,type} = ctx.request.body
        let {id,back_img,front_img,id_card,name,user_id} = info

        let obj1 = {}
        name && Object.assign(obj1, {name})
        id_card && Object.assign(obj1, {id_card})
        front_img && Object.assign(obj1, {front_img})
        back_img && Object.assign(obj1, {back_img})

        if(type=='agreen'){ //同意
            // 更改用户信息
            Object.assign(obj1, {authority:'recycler'})
            let res1 = await updateById(user_id,obj1)

            let obj2 = {}
            Object.assign(obj2, {state: 'pass'})
            //更改申请信息
            let res2 = await updateRecyclerById(id,obj2)

            ctx.body = {
                code: 0,
                message: '申请管理员成功',
                result: res2
            }
        }else if(type=='refuse'){ //拒绝
            let obj = {}
            Object.assign(obj, {state: 'refuse'})
            //更改申请信息
            let res = await updateRecyclerById(id,obj)

            ctx.body = {
                code: 0,
                message: '申请拒绝成功',
                result: res
            }
        }
        
    }

    // 添加查询管理员申请
    async searchRecycler(ctx,next){
        const {pageNum, pageSize, username, state,user_id} = ctx.request.body

        console.log(pageNum, pageSize, username, state,user_id)
        
        let res = await searchRecycler(pageNum, pageSize, username, state)
        
         // 根据返回的用户id获取每个申请者的用户信息
         let list = res.list
         for(let i=0; i<res.list.length; i++){
             let id = list[i].user_id
             console.log(id)
             let userInfo = await getById(id)
             console.log('userInfo',userInfo[0].dataValues)
             list[i].dataValues.userInfo = userInfo[0].dataValues
         }
 
         res.list = list
         console.log('返回结果',res.list)
 
         ctx.body = {
             code: 0,
             message: '获取回收员申请列表成功',
             result: res
         }
    }

}



module.exports = new RecyclerController()