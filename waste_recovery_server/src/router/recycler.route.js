/*回收员接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/recycler'})

const {
    createRecycler,
    upload,
    getRecyclerList,
    disposeApply,
    searchRecycler
} = require('../controller/recycler.controller')

// 添加废品类型
router.post('/create',createRecycler)

// 上传废品照片
router.post('/upload',upload)

// 获取全部废品分类
router.post('/getAll',getRecyclerList)

// 同意/拒绝申请
router.post('/dispose',disposeApply)

// 条件搜索管理员申请
router.post('/search',searchRecycler)

module.exports = router