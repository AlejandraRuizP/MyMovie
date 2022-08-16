const express = require('express')

const {getPelicula,getHome} = require('../controllers/pelicula2')
const {verificarSesionCookie, verificarSesionHeader} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/:id',getPelicula)


module.exports = router