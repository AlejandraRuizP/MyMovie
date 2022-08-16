require('dotenv').config()
const jwt = require('../utils/jwt')

const verificarSesionHeader = async (req,res,next)=>{
    if(!req.cookies){

    }

    const token = req.cookies[process.env.JWT_COOKIE];
    if(!token){
 
    }
    let datos = await jwt.verificarToken(token);
    if(!datos){

    }
    req.datos=datos;
    next();
}

const verificarSesionCookie = async (req,res,next)=>{
    if(!req.cookies){
        return res.redirect('/pelicula/'+req.params.id)
    }
    const token = req.cookies[process.env.JWT_COOKIE]

    if(!token){
        return res.redirect('/pelicula2/'+req.params.id)
    }
    let datos = await jwt.verificarToken(token)
    if(!datos){
        return res.redirect('/pelicula2/'+req.params.id)
    }
    req.datos = datos
    next()
}
const verificarSesionCookie2 = async (req,res,next)=>{
    if(!req.cookies){
        return res.redirect('/login')
    }

    const token = req.cookies[process.env.JWT_COOKIE]

    if(!token){
        return res.redirect('/login')
    }
    let datos = await jwt.verificarToken(token)
    if(!datos){
        return res.redirect('/login')
    }
    req.datos = datos
    next()
}

const prevenirLoginRegistro = async (req,res,next)=>{
    if(!req.cookies){
       return next()
    }
    const token = req.cookies[process.env.JWT_COOKIE]

    if(!token){
        return next()
    }
    let datos = await jwt.verificarToken(token)
    if(!datos){
        return next()
    }
    return res.redirect('/home')
}

module.exports = {verificarSesionHeader,verificarSesionCookie,verificarSesionCookie2, prevenirLoginRegistro}