/*废品接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/waste'})

const {
    createWaste,
    upload,
    getAllWasteInfo,
    getWasteType,
    updateWasteById,
    searchWaste,
    removeWaste
} = require('../controller/waste.controller')

// 添加废品类型
router.post('/create',createWaste)

// 上传废品照片
router.post('/upload',upload)

// 获取全部废品信息
router.post('/getAll',getAllWasteInfo)

// 获取全部废品类型
router.post('/getType',getWasteType)

// 修改废品图鉴信息
router.post('/update',updateWasteById)

// 条件查询废品图鉴信息
router.post('/search',searchWaste)

// 删除废品图鉴信息
router.post('/remove',removeWaste)

module.exports = router