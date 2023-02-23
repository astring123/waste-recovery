const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型（这里user对应数据库中的users表）
const Audit = seq.define('audit',{
    // id会被sequelize自动创建
    user_id:{
        type: DataTypes.INTEGER,//数据类型
        allowNull: false, //是否允许为空
        unique: true,//字段唯一
        comment: '用户id',//字段注释
    },
    front_img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '身份张正面图片'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    back_img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '身份张背面图片'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unsuccessful',//默认值
        comment: '状态，未审核：unaudited，通过：pass，拒绝：refuse'
    }
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Audit.sync({force: true})

module.exports = Audit