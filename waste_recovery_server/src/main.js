const {APP_PORT} = require('./config/config.default')
const app =require('./app/index')

// app.use((ctx, next) => {
//     ctx.body = 'hello world'
// })

app.listen(APP_PORT,()=>{
    console.log(`Server is running on http://localhost:${APP_PORT}`)
})

/* 插件中使用的插件 */
// 整个nodejs项目框架：koa
// 帮助解析http中body：koa-body
// 接口路由：koa-router
// 将某个目录设置为静态资源文件夹：koa-static
// 操作数据库：Sequelize
// 响应式运行项目：nodemon
// 生成及处理token：jsonwebtoken
// 密码的加密解密：bcryptjs
// 参数的校验：koa-parameter