const Waste = require('../model/waste.model')

class WasteService{

    // 添加订单
    async createWaste(waste){
        const res = await Waste.create( waste )
        return res.dataValues
    }

    //获取废品分类
    async getAllWasteInfo(pageNum=1, pageSize){

        const count = await Waste.count()
        let num = 0
        let offset
        if(!pageSize){ //如果没有传页数据条数，则返回所有废品信息
            let offset = 0
            if(pageNum != 0){
                offset = (pageNum-1) * count
            }
            num = count
        }else{
            let offset = 0
            if(pageNum != 0){
                offset = (pageNum-1) * pageSize
            }
            num = pageSize
        }
        

        const {rows} = await Waste.findAndCountAll({offset: offset, limit:(num * 1)})

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 修改废品图鉴信息
    async updateWasteById(id,waste){
        const res = await Waste.update(waste, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 条件查询废品图鉴
    async searchWaste(pageNum=1, pageSize=10, name, type){
        console.log(name,type)
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        if(name && type!='all'){
            var {count,rows} = await Waste.findAndCountAll({
                where:{
                    name,
                    type
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(name && type=='all'){
            var {count,rows} = await Waste.findAndCountAll({
                where:{
                    name,
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!name && type!='all'){
            var {count,rows} = await Waste.findAndCountAll({
                where:{
                    type
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!name && type=='all'){
            var {count,rows} = await Waste.findAndCountAll({
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

    // 删除废品图鉴
    async removeWaste(id){
        console.log(id)
        const res =  await Waste.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }
}

module.exports = new WasteService()