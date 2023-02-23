const fs = require('fs')
const Router = require('koa-router')

const router = new Router()

fs.readdirSync(__dirname).forEach(file => { //__dirname:当前目录下
    // console.log(file)
    if(file !== 'index.js'){
        let r = require('./' + file) //r为文件对象
        router.use(r.routes()) //router.use():注册中间件；
    }
})

// console.log(router)

module.exports = router