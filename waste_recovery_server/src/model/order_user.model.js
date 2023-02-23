const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 订单-用户关联表
const OrderUser = seq.define('order_user',{
    // id会被sequelize自动创建
    user_id:{
        type: DataTypes.INTEGER,//数据类型
        allowNull: false, //是否允许为空
        unique: true,//字段唯一
        comment: '用户id,唯一',//字段注释
    },
    recycler_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        comment: '回收员id'
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        comment: '订单id'
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// OrderUser.sync({force: true})

module.exports = OrderUser