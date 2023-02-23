const Rotograph = require('../model/rotograph.model')

class RotographService{

    // 添加轮播图
    async createRotograph(obj){
        const res = await Rotograph.create( obj )
        return res.dataValues
    }

    //获取轮播图
    async getRotograph(){
        const res = await Rotograph.findAll()
        return res
    }

    // 删除轮播图
    async removeRotograph(id){
        console.log(id)
        const res =  await Rotograph.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }
}

module.exports = new RotographService()