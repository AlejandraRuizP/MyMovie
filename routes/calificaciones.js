const express = require('express')
const {getCalificaciones,postCalificaciones,deleteCalificacion} = require('../controllers/calificaciones')
const {verificarSesionCookie2} = require('../middleware/auntenticacion')
const {verificarPermiso} = require('../middleware/permisos')
const router = express.Router()

router.get('/',verificarSesionCookie2,getCalificaciones)
router.post('/',verificarSesionCookie2,postCalificaciones)
router.delete('/:id',verificarSesionCookie2,deleteCalificacion)
module.exports = router