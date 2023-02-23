const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型（这里user对应数据库中的users表）
const Rotograph = seq.define('rotograph',{
    // id会被sequelize自动创建
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '轮播图'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Rotograph.sync({force: true})

module.exports = Rotograph