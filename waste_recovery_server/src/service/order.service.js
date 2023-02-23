const Order = require('../model/order.model')

class OrderService{

    // 添加订单
    async createOrder(order){
        const res = await Order.create( order )
        return res.dataValues
    }

    // 根据页码获取订单
    async getAllOrder(pageNum, pageSize){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }

        const count = await Order.count()
        const {rows} = await Order.findAndCountAll({offset: offset, limit:(pageSize * 1)})

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    //根据用户id获取订单列表
    async getByUesrId(user_id){
        let res = await Order.findAll({
            where:{'user_id':user_id},
            // attributes:['music_id']
        })
        
        return res
    }

    //根据回收员id获取订单列表
    async getByRecyclerId(recycler_id){
        let res = await Order.findAll({
            where:{'recycler_id':recycler_id},
            // attributes:['music_id']
        })
        
        return res
    }

    // 获取数据总数
    async getCount(){
        const count = await Order.count()
        return count
    }

    //根据id修改信息
    async updateById(id,order){
        const res = await Order.update(order, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 条件查询申请列表
    async searchOrder(pageNum=1, pageSize=10, id, state){
        console.log(id,state)
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        if(id && state!='all'){
            var {count,rows} = await Order.findAndCountAll({
                where:{
                    id,
                    state
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(id && state=='all'){
            var {count,rows} = await Order.findAndCountAll({
                where:{
                    username,
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!id && state!='all'){
            var {count,rows} = await Order.findAndCountAll({
                where:{
                    state
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!id && state=='all'){
            var {count,rows} = await Order.findAndCountAll({
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

    // 删除订单
    async removeOrder(id){
        console.log(id)
        const res =  await Order.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }
}

module.exports = new OrderService()