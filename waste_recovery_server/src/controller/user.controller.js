const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { 
    fileUploadError, 
    unSupportedFileType, 
} = require('../constants/err.type')

const {
    getUserInfoByUsername,
    createUser,
    getUserById,
    getAllUserInfo,
    updateById,
    searchUser,
    removeById,
    getCount
} = require('../service/user.service')

const {
    getByUesrId,
} = require('../service/order.service')

class UserController{
    // 登录
    async login(ctx,next){

        // 拿到前端发送请求中传的用户名和密码
        const { username,password } = ctx.request.body
        console.log(username,password)

        // 根据用户名获取数据库中的用户信息
        let res = await getUserInfoByUsername(1,200,username)
        console.log(res.list)

        let message = '', code = 0, userInfo = {}, token = ''

        // 判断返回的数组中是否有内容，有证明有用户，没有证明用户未注册
        if(res.list.length>0){

            // 获取数组中的用户信息的密码，这个用户对应的真正密码
            let realPassword = res.list[0].dataValues.password
            console.log('realPassword:',realPassword)

            // 前端发送过来的密码和数据库中拿到的密码相同，则登录成功
            if(password == realPassword){
                message = '登录成功'

                // 设置用户信息
                userInfo = {
                    permissions: res.list[0].dataValues.authority, //用户权限
                    username: res.list[0].dataValues.username, //用户名
                    img: res.list[0].dataValues.img, //用户头像地址
                    id: res.list[0].dataValues.id, //用户id
                    phone: res.list[0].dataValues.phone, //用户电话
                    name: res.list[0].dataValues.name, //用户姓名
                }

                // 设置token值
                token = jwt.sign(res.list[0].dataValues, JWT_SECRET, {expiresIn: '1d'}) //1d表示 token 1天后过期，10表示10秒后过期
            }else{
                code = 1061
                message = '密码错误'
            }
        }else{
            code = 1060
            message = '账号不存在'
        }

        // 响应给前端的响应内容
        ctx.body = {
            code,
            message,
            token,
            userInfo
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
                message: '用户头像上传成功',
                result: {
                    user_img: path.basename(file.filepath)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    // 注册
    async createUser(ctx,next){
        const { username,name,password,img,phone,id_card,authority,front_img,back_img, } = ctx.request.body
        let userInfo = {
            username,
            name,
            password,
            img,
            phone,
            id_card,
            authority,
            front_img,
            back_img,
        }
        let res = await createUser(userInfo)
        ctx.body = {
            code: 0,
            message: '注册成功',
            result: res
        }
    }

    // 根据用户id获取用户信息
    async getUserById(ctx,next){
        const { pageNum, pageSize, id } = ctx.request.body

        console.log('用户id',id)
        let userInfo = await getUserById(pageNum, pageSize, id)
        console.log('userInfo',userInfo)
        userInfo.list[0].password = '**********'

        ctx.body = {
            code: 0,
            message: '获取用户信息成功',
            result: userInfo
        }
    }

    // 获取用户列表
    async getAllUserInfo(ctx,next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAllUserInfo(pageNum, pageSize)

        ctx.body = {
            code: 0,
            message: '获取用户列表成功',
            result: res
        }
    }

    // 根据用户id修改用户信息
    async updateUserById(ctx,next){

        // const id = ctx.request.params.id
        const { id,username,name,password,img,phone,id_card,authority,front_img,back_img, } = ctx.request.body

        let obj = {}
        img && Object.assign(obj, {img})
        name && Object.assign(obj, {name})
        username && Object.assign(obj, {username})
        password && Object.assign(obj, {password})
        phone && Object.assign(obj, {phone})
        id_card && Object.assign(obj, {id_card})
        authority && Object.assign(obj, {authority})
        front_img && Object.assign(obj, {front_img})
        back_img && Object.assign(obj, {back_img})
        
        console.log('获取到的参数：',obj)

        let res = await updateById(id,obj)

        ctx.body = {
            code: 0,
            message: '修改用户信息成功',
            result: res
        }
    }

    // 条件查询用户
    async searchUser(ctx,next){
        const {pageNum, pageSize, username, authority} = ctx.request.body

        console.log(pageNum, pageSize, username, authority)
        
        let res = await searchUser(pageNum, pageSize, username, authority)
        
        ctx.body = {
            code: 0,
            message: '获取用户信息成功',
            result: res
        }
    }

    // 根据用户id删除用户
    async removeUserById(ctx,next){

        const { id } = ctx.request.body
        console.log(id)

        // 再删除user表中的数据
        let res = await removeById(id)

        ctx.body = {
            code: 0,
            message: '删除用户信息成功',
            result: res
        }
    }
    
    // 根据用户id修改用户密码
    async updatePassword(ctx,next){

        // const id = ctx.request.params.id
        const { id, oldPassword, newPassword } = ctx.request.body

        // 判断旧密码是否正确
        let info = await getUserById(1,10,id)
        // console.log('用户信息',info.list[0].dataValues)

        let code = 500, message='账号或旧密码错误', res = false

        if( info.list[0].dataValues.password && 
            oldPassword === info.list[0].dataValues.password){
            let obj = {}
            newPassword && Object.assign(obj, {password:newPassword})
            // console.log('获取到的参数：',obj)

            let res = await updateById(id,obj)
            

            message = '修改密码失败'
            code =  501

            if(res){
                message = '修改密码成功'
                code =  0
            }
        }

        ctx.body = {
            code,
            message,
            result: res
        }
    }

    // 获取回收排行榜前五名
    async getBest(ctx,next){

        let count = await getCount() //获取数据总条数
        let userList = await getAllUserInfo(1, count)

        // console.log('全部数据',res)

        let res = [] //

        // 遍历所有用户，并判断用户是否有订单
        for(let i=0; i<userList.list.length; i++){

            let id = userList.list[i].dataValues.id
            let username = userList.list[i].dataValues.username
            let img = userList.list[i].dataValues.img
            let orderList = await getByUesrId(id)
            // console.log('id',id,'orderList',orderList) 

            // 用户有订单
            if(orderList.length!==0){
                // 遍历订单，判断订单是否已完成，将已完成的订单内的重量相加获取一共回收过的总重量
                let weightTotal = 0
                orderList.forEach(item => {
                    let weight = item.dataValues.weight
                    console.log('item',item.dataValues,'weight',weight)
                    if(item.dataValues.state=='finish'){
                        weightTotal += Number(weight)
                    }
                })
                // console.log('id',id,'username',username,'weightTotal',weightTotal)

                res.push({id, username, img, weight: weightTotal})
            }
        }

        // 将每个重量抽取出来存入数组
        let weightList = []
        res.forEach(item => {
            weightList.push(item.weight)
        })
        console.log('weightList',weightList)

        // 根据重量数组进行排序，同时给要返回去前端的数组进行排序
        for(let i = 0; i < weightList.length; i++) {
            for (let j=0; j < weightList.length-i; j++) {
                if (weightList[j] < weightList[j+1]) {
                  let num1 = weightList[j]
                  weightList[j] = weightList[j+1]
                  weightList[j+1] = num1

                  let num2 = res[j]
                  res[j] = res[j+1]
                  res[j+1] = num2
                }
            }
        }

        console.log('weightList',weightList)

        //截取前五个
        res = res.slice(0,5)

        ctx.body = {
            code: 0,
            message: '获取排行榜列表成功',
            result: res
        }
    }
}



module.exports = new UserController()