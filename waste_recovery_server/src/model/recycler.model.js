const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 管理员申请表
const Recycler = seq.define('recycler',{
    // id会被sequelize自动创建
    user_id:{
        type: DataTypes.INTEGER,//数据类型
        allowNull: false, //是否允许为空
        unique: true,//字段唯一
        comment: '用户id,唯一',//字段注释
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户名' 
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '真实姓名' 
    },
    id_card:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '身份证号码' 
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
        defaultValue: 'unaudited',//默认值
        comment: '审核状态'
    }
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Recycler.sync({force: true})

module.exports = Recycler