/*回收员接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/rotograph'})

const {
    createRotograph,
    getRotograph,
    removeRotograph,
} = require('../controller/rotograph.controller')

// 添加轮播图
router.post('/create',createRotograph)

// 获取轮播图
router.post('/getAll',getRotograph)

// 删除轮播图
router.post('/remove',removeRotograph)

module.exports = router