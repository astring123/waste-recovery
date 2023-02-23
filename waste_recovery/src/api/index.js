import request from './request'

//用户：
// 注册
export function apiRegister(data){
    return request('POST','/user/register', data)
}
// 登录
export function apiLogin(data){
    return request('POST','/user/login', data)
}
// 修改密码
export function apiUpdatePassword(data){
    return request('POST','/user/password', data)
}
// 根据用户id获取用户信息
export function apiGetUserInfo(data){
    return request('POST','/user/getInfo', data)
}
//获取用户列表
export function apiGetUserList(data){
    return request('POST','/user/', data)
}
// 修改用户信息接口
export function apiUpdateUser(data){
    return request('POST','/user/update', data)
}
// 按条件查询用户
export function apiSearchUser(data){
    return request('POST','/user/search', data)
}
// 删除用户信息接口
export function apiRemoveUser(data){
    return request('POST','/user/remove', data)
}
// 获取回收排行榜用户
export function apiGetBest(data){
    return request('POST','/user/getBest', data)
}

//订单：
//创建订单
export function apiCreateOrder(data){
    return request('POST','/order/create', data)
}
//删除订单
export function apiRemoveOrder(data){
    return request('POST','/order/remove', data)
}
//上传废品图片
export function apiUploadOrderImg(data){
    return request('POST','/order/upload', data)
}
//根据页码获取订单
export function apiGetOrder(data){
    return request('POST','/order/getAll', data)
}
//根据用户id获取订单
export function apiGetOrderByUserId(data){
    return request('POST','/order/getByUserId', data)
}
//根据回收员id获取订单
export function apiGetOrderByRecyclerId(data){
    return request('POST','/order/getByRecyclerId', data)
}
//获取未接单订单列表
export function apiGetMissOrder(data){
    return request('POST','/order/getMiss', data)
}
//修改订单信息
export function apiUpdateOrder(data){
    return request('POST','/order/update', data)
}
// 按条件查询用户
export function apiSearchOrder(data){
    return request('POST','/order/search', data)
}


//废品：
//获取全部废品信息
export function apiGetAllWaste(data){
    return request('POST','/waste/getAll', data)
}
//获取全部废品类型
export function apiGetWasteType(data){
    return request('POST','/waste/getType', data)
}
//添加废品
export function apiCreateWaste(data){
    return request('POST','/waste/create', data)
}
//修改废品图鉴信息
export function apiUpdateWaste(data){
    return request('POST','/waste/update', data)
}
// 按条件查询用户
export function apiSearchWaste(data){
    return request('POST','/waste/search', data)
}
// 按条件查询用户
export function apiRemoveWaste(data){
    return request('POST','/waste/remove', data)
}


//回收员：
//添加回收员申请
export function apiRecyclerApply(data){
    return request('POST','/recycler/create', data)
}
//获取申请回收员列表
export function apiGetRecyclerList(data){
    return request('POST','/recycler/getAll', data)
}
//同意/拒绝申请
export function apiDisposeApply(data){
    return request('POST','/recycler/dispose', data)
}
//条件搜索回收员申请
export function apiSearchRecycler(data){
    return request('POST','/recycler/search', data)
}


//公告：
//添加公告
export function apiCreateAnn(data){
    return request('POST','/announcement/create', data)
}
//修改公告
export function apiUpdateAnn(data){
    return request('POST','/announcement/update', data)
}
//获取公告列表
export function apiGetAnn(data){
    return request('POST','/announcement/getAll', data)
}
//删除公告
export function apiRemoveAnn(data){
    return request('POST','/announcement/remove', data)
}

//轮播图
//添加轮播图
export function apiCreateRot(data){
    return request('POST','/rotograph/create', data)
}
//获取轮播图列表
export function apiGetRot(data){
    return request('POST','/rotograph/getAll', data)
}
//删除轮播图
export function apiRemoveRot(data){
    return request('POST','/rotograph/remove', data)
}