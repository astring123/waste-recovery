const Recycler = require('../model/recycler.model')

class RecyclerService{

    // 添加订单
    async createRecycler(recyclerInfo){
        const res = await Recycler.create( recyclerInfo )
        return res.dataValues
    }

    // 获取回收员申请列表
    async getRecyclerList(pageNum, pageSize){
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }

        const count = await Recycler.count()
        const {rows} = await Recycler.findAndCountAll({offset: offset, limit:(pageSize * 1)}) //findAndCountAll合并了上面两个方法

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 更改申请信息
    async updateRecyclerById(id,obj){
        const res = await Recycler.update(obj, {where: {id}})
        return !!res[0]
    }

    // 根据id判断回收员是否存在
    async getByUserId(id){
        const res = await Recycler.findAll({where:{id}})
        return !!res[0]
    }

    // 条件查询申请列表
    async searchRecycler(pageNum=1, pageSize=10, username, state){
        console.log(username,state)
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        if(username && state!='all'){
            var {count,rows} = await Recycler.findAndCountAll({
                where:{
                    username,
                    state
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(username && state=='all'){
            var {count,rows} = await Recycler.findAndCountAll({
                where:{
                    username,
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!username && state!='all'){
            var {count,rows} = await Recycler.findAndCountAll({
                where:{
                    state
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!username && state=='all'){
            var {count,rows} = await Recycler.findAndCountAll({
                offset: offset, limit:(pageSize * 1)
            }) 
        }

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }   
}

module.exports = new RecyclerService()