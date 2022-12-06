//IMPORTAÇÃO DO MODULO POSTGRES QUE SERÁ USADO COMO DIALETO DO SEQUELIZE
const postgres = require('postgres')

//IMPORTAÇÃO DA ORM SEQUELIZE PARA CONECTAR COM BANCO DE DADOS
const {Sequelize} = require('sequelize')

//DEIFININDO CONFIGURAÇÕES DO BANCO DE DADOS
                                //DATABASE//USERNAME//PASSWORD
const sequelize = new Sequelize('pensamentos','postgres','123456789',{
    //HOST NAME/ADDRESS
    host : 'localhost',
    dialect: "postgres",
    port: '5432'
})

try {
    //COMANDO PRA CONECTAR AO BANCO
    sequelize.authenticate()
    console.log('conectado com o banco')
} catch(err){
    console.log(`não conectou ${err}`)
}

//EXPORTANDO AS CONFIGURAÇOES DO BANCO
module.exports = sequelize