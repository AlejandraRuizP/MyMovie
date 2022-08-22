const express = require('express')

//const {getUsuarios} = require('../controllers/usuarios')
const {getUsuarios,editUsuarios,deleteUsuario,getUsuarioP} = require('../controllers/usuarios')
const {verificarSesionCookie} = require('../middleware/auntenticacion')
const {verificarPermiso} = require('../middleware/permisos')
const router = express.Router()


router.get('/',verificarSesionCookie,verificarPermiso,getUsuarios)
router.get('/:id',verificarSesionCookie,verificarPermiso,getUsuarioP)
router.put('/:id',verificarSesionCookie,verificarPermiso,editUsuarios)
router.delete('/:id',verificarSesionCookie,verificarPermiso,deleteUsuario)

module.exports = router