require('dotenv').config()
const jwt = require('../utils/jwt')
const {Usuario} = require('../models')

const verificarPermiso = async (req,res,next)=>{
    let datos = req.datos
    console.log(datos)
    let usuario;
    try {
        usuario = await Usuario.findByPk(datos.email)
    } catch (error) {
        console.log('Error al bbuscar permiso:'+error.message)
        return res.status(500).json({error:'Error interno'})
    }
    //existe el usuario
    if(!usuario){
        return res.status(403).render('forbidden')
    }
    //si es usuario existe pero no tiene permisos
    if(usuario.idRol!=1){
        return res.status(403).render('forbidden')
    }
    //todo ok
    next()
}

module.exports = {verificarPermiso}