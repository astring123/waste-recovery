/*订单接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/order'})

const {
    createOrder,
    upload,
    getAllOrder,
    getByUesrId,
    getMissOrder,
    updateOrderById,
    getByRecyclerId,
    searchOrder,
    removeOrder,
} = require('../controller/order.controller')

// 创建订单
router.post('/create',createOrder)

// 删除订单
router.post('/remove',removeOrder)

// 上传废品照片头像
router.post('/upload',upload)

// 根据页码获取订单
router.post('/getAll',getAllOrder)

// 条件搜索订单
router.post('/search',searchOrder)

// 获取未被接单的订单
router.post('/getMiss',getMissOrder)

// 根据用户id获取订单 
router.post('/getByUserId',getByUesrId)

// 根据回收员id获取订单 
router.post('/getByRecyclerId',getByRecyclerId)

// 修改订单信息
router.post('/update',updateOrderById)

module.exports = router