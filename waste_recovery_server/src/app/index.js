//node核心模块
const path = require('path') 

// 第三方模块
const Koa = require('Koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

//自己编写的模块 
const errHandler = require('./errHandler')
const router = require('../router')

const app = new Koa()

//必须要在所有中间件注册之前
app.use(
    KoaBody({
        // 使koa-body能够解析文件上传的配置
        multipart: true,
        formidable:{
            // 在配置选项option里，不推荐使用相对路径
            // 在option里的相对路径，不是相对的当前文件，相对的是process.cwd()
            uploadDir: path.join(__dirname, '../upload'),
            keepExtensions: true,
        },
        parsedMethods: ['POST','PUT','PATCH','DELETE'] //默认情况下不会将put、head、delete请求的body不会挂载到ctx.body中，通过在这里配置实现
    })
) 

app.use(KoaStatic(path.join(__dirname,'../upload'))) //参数为静态资源的路径

app.use(parameter(app)) //要在路由注册之前

app.use(router.routes()).use(router.allowedMethods())//router.allowedMethods()使当用户使用不允许的请求方法请求时报501

// 统一的错误处理
app.on('error',errHandler)


module.exports = app
