const User = require('../model/user.model')

class UserService{

    //获取全部用户信息
    async getAllUserInfo(pageNum, pageSize){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }

        const count = await User.count()
        const {rows} = await User.findAndCountAll({offset: offset, limit:(pageSize * 1)}) //findAndCountAll合并了上面两个方法

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    //根据id获取用户
    async getById(id){
        const res = await User.findAll({where:{id}})
        return res
    }

    // 根据username获取用户信息
    async getUserInfoByUsername(pageNum=1, pageSize=10, username){
        // return await User.findAll({
        //     where:{id},
        //     // attributes:['id','name']
        // })
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        
        const {count,rows} = await User.findAndCountAll({
            where:{username},
            offset: offset, limit:(pageSize * 1)
        }) 

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 修改用户信息
    async updateById(id,user){
        const res = await User.update(user, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 删除用户
    async removeById(id){
        console.log(id)
        const res =  await User.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加用户
    async createUser(user){
        const res = await User.create( user )
        return res.dataValues
    }

    // 根据id获取信息
    async getUserById(pageNum=1, pageSize=10, id){
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        
        const {count,rows} = await User.findAndCountAll({
            where:{id},
            offset: offset, limit:(pageSize * 1)
        }) 

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    //获取用户信息列表
    async getAllUserInfo(pageNum, pageSize){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }

        const count = await User.count()
        const {rows} = await User.findAndCountAll({offset: offset, limit:(pageSize * 1)}) //findAndCountAll合并了上面两个方法

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 条件查询用户
    async searchUser(pageNum=1, pageSize=10, username, authority){
        console.log(username,authority)
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        if(username && authority!='all'){
            var {count,rows} = await User.findAndCountAll({
                where:{
                    username,
                    authority
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(username && authority=='all'){
            var {count,rows} = await User.findAndCountAll({
                where:{
                    username,
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!username && authority!='all'){
            var {count,rows} = await User.findAndCountAll({
                where:{
                    authority
                },
                offset: offset, limit:(pageSize * 1)
            }) 
        }else if(!username && authority=='all'){
            var {count,rows} = await User.findAndCountAll({
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

    // 获取数据总数
    async getCount(){
        const count = await User.count()
        return count
    }
}

module.exports = new UserService()