const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型（这里user对应数据库中的users表）
const User = seq.define('user',{
    // id会被sequelize自动创建
    username:{
        type: DataTypes.STRING,//数据类型
        allowNull: false, //是否允许为空
        unique: true,//字段唯一
        comment: '用户名,唯一',//字段注释
    },
    name:{
        type: DataTypes.STRING,//数据类型
        allowNull: true, //是否允许为空
        comment: '姓名',//字段注释
    },
    img:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '头像'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    password:{
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '电话'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    id_card:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '身份证号码' 
    },
    front_img:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '身份张正面图片'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    back_img:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '身份张背面图片'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
    authority:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',//默认值
        comment: '是否为管理员,user:普通用户(默认),recycler:是回收员,admin:管理员'
    }
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// User.sync({force: true})

module.exports = User