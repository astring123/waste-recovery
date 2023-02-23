/*用户接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/user'})

const {
    login,
    upload,
    createUser,
    getUserById,
    getAllUserInfo,
    updateUserById,
    searchUser,
    removeUserById,
    updatePassword,
    getBest
} = require('../controller/user.controller')

// 注册
router.post('/register',createUser)

// 上传用户头像
router.post('/upload',upload)

// 登录
router.post('/login',login)

// 根据用户id获取用户数据
router.post('/getInfo',getUserById)

// 获取全部用户信息
router.post('/',getAllUserInfo)

// 修改用户信息
router.post('/update',updateUserById)

// 条件搜索用户信息
router.post('/search',searchUser)

// 删除用户
router.post('/remove',removeUserById)

// 修改密码
router.post('/password',updatePassword)

// 获取回收排行榜前五名
router.post('/getBest',getBest)

module.exports = router