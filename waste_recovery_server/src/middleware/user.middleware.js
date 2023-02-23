/* 该模块定义各种操作的中间件 */

const bcrypt = require('bcryptjs'); //通过这个包来完成密码的加密

const { getUserInfo } = require('../service/user.service')
const { 
    userFormateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword,
 } = require('../constants/err.type')

//用户名或密码是否为空校验 
const userValidator = async (ctx,next) => {
    const { user_name, password } = JSON.parse(ctx.request.body) //这里必须使用JSON.parse()转换格式
    // 合法性:  
    if(!user_name || !password){
        console.error("用户名或密码为空",ctx.request.body)
        ctx.app.emit('error',userFormateError,ctx)
        return
    }

    await next()
}

const verifyUser = async (ctx,next) => {
    const { user_name } = JSON.parse(ctx.request.body)

    try{
        // 合理性:
        if(await getUserInfo({user_name})){
            console.error('用户名已经注册',{user_name})
            ctx.app.emit('error',userAlreadyExited,ctx)
            return
        }
    }catch(err){
        console.log('用户注册失败',err)
        ctx.app.emit('error',userRegisterError,ctx)
    }
    await next()
    
}

// 密码加密
const crpytPassword = async (ctx, next) => {
    ctx.request.body = JSON.parse(ctx.request.body)

    console.log(ctx.request.body)

    const {password} = ctx.request.body

    // 加密的过程，可在bcrypy官网中进行复制
    const salt = bcrypt.genSaltSync(10);
    // hash为密码加密后的结果
    const hash = bcrypt.hashSync(password, salt);

    // 将加密结果对密码进行覆盖
    ctx.request.body.password = hash

    // 执行下一步
    await next()
}

// 登录验证中间件
const verifyLogin = async (ctx, next) => {

    ctx.request.body = JSON.parse(ctx.request.body)
    const { user_name, password } = ctx.request.body
    console.log(user_name,password)

    try{
        const res = await getUserInfo({user_name})

        // 1、判断用户是否存在（不存在：报错）
        if(!res){
            console.error('用户名不存在',{user_name})
            ctx.app.emit('error', userDoesNotExist, ctx)
            return 
        }

        // 2、判断密码是否匹配（不匹配：报错）
        if(!bcrypt.compareSync(password, res.password)){ //对数据库中password解密然后进行匹配
            ctx.app.emit('error', invalidPassword, ctx)
            return 
        }
    }catch(err){
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }

    await next()
} 

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}