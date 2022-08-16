const express = require('express')

const {getAdmin} = require('../controllers/admin')
const {verificarSesionCookie} = require('../middleware/auntenticacion')
const {verificarPermiso} = require('../middleware/permisos')

const router = express.Router()

router.get('/',verificarSesionCookie,verificarPermiso,getAdmin)

module.exports = router