const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型（这里user对应数据库中的users表）
const Order = seq.define('order',{
    // id会被sequelize自动创建
    user_id:{
        type: DataTypes.INTEGER,//数据类型
        allowNull: false, //是否允许为空
        comment: '用户id,唯一',//字段注释
    },
    recycler_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: -1,
        comment: '回收员id'
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '发布者姓名'
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '发布者电话'
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '废品类型'
    },
    weight:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '废品重量'
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '地址'
    },
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '废品图片地址'
    },
    time:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '上门时间'
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unsuccessful',//默认值
        comment: '状态，未接单：unsuccessful，已接单：unfinished，已完成：finish'
    }
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Order.sync({force: true})

module.exports = Order