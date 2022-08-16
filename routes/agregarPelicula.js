const express = require('express')


const {getNewMovie,postNewMovie} = require('../controllers/agregarpelicula')

const router = express.Router()

router.get('/',getNewMovie)
router.post('/',postNewMovie)

module.exports = router