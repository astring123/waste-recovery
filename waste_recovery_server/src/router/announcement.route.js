/*回收员接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/announcement'})

const {
    createAnnouncement,
    getAnnouncement,
    updateAnnouncement,
    removeAnnouncement,
} = require('../controller/announcement.controller')

// 添加公告
router.post('/create',createAnnouncement)

// 获取公告
router.post('/getAll',getAnnouncement)

// 编辑公告
router.post('/update',updateAnnouncement)

// 删除公告
router.post('/remove',removeAnnouncement)

module.exports = router