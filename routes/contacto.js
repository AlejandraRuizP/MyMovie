const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()

const {getContact,postContact}= require('../controllers/contacto')
const {verificarSesionCookie} = require('../middleware/auntenticacion')

const router = express.Router()

router.get('/',verificarSesionCookie,getContact)
router.post('/',verificarSesionCookie,postContact)
module.exports= router