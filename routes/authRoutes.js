
const express = require('express')
//IMPORTAÇÃO DO MODULO DE 
const router = express.Router()

//IMPORTANDO A CLASSE DO CONTROLLER
const AuthController = require('../controllers/AuthController')

//ROTAS QUE USAM AS FUNÇÕES DO CONTROLLER
router.get('/login',AuthController.login)
router.post('/login',AuthController.loginPost)
router.get('/register',AuthController.register)
router.post('/register',AuthController.registerPost)
router.get('/logout',AuthController.logout)

module.exports = router