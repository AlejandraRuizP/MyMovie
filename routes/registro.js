const express = require('express')

const {getRegister,postRegister} = require('../controllers/registro')
const {prevenirLoginRegistro} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/',prevenirLoginRegistro,getRegister)
router.post('/',prevenirLoginRegistro,postRegister)

module.exports = router