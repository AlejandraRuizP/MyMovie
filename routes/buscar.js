const express = require('express')
const { getNavbar } = require('../controllers/buscar')
const {verificarSesionCookie2} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/',getNavbar)
module.exports = router