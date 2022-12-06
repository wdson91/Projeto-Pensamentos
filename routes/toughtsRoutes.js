const express = require('express')
const router = express.Router()

const ToughtController = require('../controllers/ToughtController')
//IMPORTAÇÃO DO MIDDLEWARE 
const checkAuth = require('../helpers/auth').checkAuth
// controllers
router.get('/add',checkAuth,ToughtController.createTought)
router.post('/add',checkAuth,ToughtController.createToughtSave)
router.get('/dashboard',checkAuth,ToughtController.dashboard)
//router.get('/',ToughtController.showToughts)
router.post('/remove',checkAuth,ToughtController.removeTought)
router.get('/edit/:id',checkAuth,ToughtController.updateTought)
router.post('/edit',checkAuth,ToughtController.updateToughtPost)


module.exports = router