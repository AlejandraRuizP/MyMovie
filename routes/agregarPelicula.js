const express = require('express')


const {getNewMovie,postNewMovie} = require('../controllers/agregarpelicula')
const {verificarSesionCookie} = require('../middleware/auntenticacion')
const {verificarPermiso} = require('../middleware/permisos')

const router = express.Router()

router.get('/',verificarSesionCookie,verificarPermiso,getNewMovie)
router.post('/',verificarSesionCookie,verificarPermiso,postNewMovie)

module.exports = router