const express = require('express')

const {getLogout} = require('../controllers/logOut')
const {verificarSesionCookie} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/',verificarSesionCookie,getLogout)

module.exports = router
