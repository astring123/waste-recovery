const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型（这里user对应数据库中的users表）
const Waste = seq.define('waste',{
    // id会被sequelize自动创建
    name:{
        type: DataTypes.STRING,//数据类型
        allowNull: false, //是否允许为空
        unique: true,//字段唯一
        comment: '废品名称,唯一',//字段注释
    },
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '图片'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '类型'
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '回收价格'
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Waste.sync({force: true})

module.exports = Waste