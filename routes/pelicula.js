const express = require('express')

const {getPelicula,editPelicula} = require('../controllers/pelicula')
const {verificarSesionCookie, verificarSesionHeader} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/:id',verificarSesionCookie,getPelicula)


module.exports = router