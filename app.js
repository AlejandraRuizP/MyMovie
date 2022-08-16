//1- carga de librerias
const express       = require('express')
const router        = require('./routes')
const bodyparser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const upload        = require('express-fileupload')
const path          = require('path')
const fs            =require('fs')


//2-. congifuracion
const app = express()
app.use(express.static(__dirname+'/public'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json())
app.use(upload())
app.set('view engine','ejs')
app.set('views',__dirname+'/views')


app.use('/',router)

app.get('/',(req,res)=>{
    res.redirect('/home')
})

module.exports=app;