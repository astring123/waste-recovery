const Announcement = require('../model/announcement.model')

class AnnouncementService{

    // 添加订单
    async createAnnouncement(obj){
        const res = await Announcement.create( obj )
        return res.dataValues
    }

    //根据id获取用户
    async getAnnouncement(){
        const res = await Announcement.findAll()
        return res
    }

    // 修改公告信息
    async updateAnnouncement(id,info){
        const res = await Announcement.update(info, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 删除用户
    async removeAnnouncement(id){
        console.log(id)
        const res =  await Announcement.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }
}

module.exports = new AnnouncementService()