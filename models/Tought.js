//IMPORTAÇÃO OS TIPOS DE DADOS DO SEQUELIZE
const {DataTypes} = require('sequelize')
//IMPORTAÇÃO DO ARQUIVO CONN COM OS DADOS DE BANCO DE DADOS
const db = require('../db/conn')
//IMPORTAÇÃO DO MODEL USER DA PASTA MODELS
const User = require('./User')
//User

const Tought = db.define('Tought' , {

    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require : true,
    },
})

//DEFININDO RELACIONAMENTOS

// UM TOUGHT PERTENCE A UM USUARIO
Tought.belongsTo(User)

// UM USUÁRIO PODE TER VÁRIOS TOUGHTS
User.hasMany(Tought)

//EXPORTANDO O MODEL 
module.exports = Tought