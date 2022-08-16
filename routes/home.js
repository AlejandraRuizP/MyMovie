const express = require('express')

const {getHome} = require('../controllers/home')
const {verificarSesionCookie,verificarSesionHeader} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/',verificarSesionHeader,getHome)

module.exports = router