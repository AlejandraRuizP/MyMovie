const express = require('express')

const {editPelicula} = require('../controllers/editpelicula')
const { verificarSesionCookie, verificarSesionHeader } = require('../middleware/auntenticacion')

const router = express.Router()

router.post('/:id',editPelicula)

module.exports = router