const express = require('express')

//const {getUsuarios} = require('../controllers/usuarios')
const {getUsuarios,editUsuarios,deleteUsuario} = require('../controllers/usuarios')
const {verificarSesionCookie} = require('../middleware/auntenticacion')
const {verificarPermiso} = require('../middleware/permisos')
const router = express.Router()


router.get('/',verificarSesionCookie,verificarPermiso,getUsuarios)
router.put('/:id',verificarSesionCookie,verificarPermiso,editUsuarios)
router.delete('/:id',verificarSesionCookie,verificarPermiso,deleteUsuario)

module.exports = router