const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const {Usuario} = require('../models')
require('dotenv').config()



const getRegister = (req,res)=>{
    res.render('registro')
}

const postRegister = async (req,res)=>{
    const usuario = req.body
    console.log(usuario)
    if(!usuario){
        return res.status(404).json({error:'No se encontraron datos'})
    }
    if(!usuario.email){
        return res.status(404).json({error:'No se encontraron datos de Email'})
    }
    if(!usuario.password || usuario.password.trim()==''){
        return res.status(404).json({error:'No se encontraron datos de password'})
    }
    let usernameDB;
    try {
        usernameDB = await Usuario.findByPk(usuario.email)
    } catch (error) {
        console.log('Error DB en postRegister user:'+error.message)
        return res.status(500).json({error:'Error interno'})
    }
    if(usernameDB){
        return res.status(500).json({error:'Username ya está en uso'})
    }
    //todo ok y encriptamos
    usuario.password = await bcrypt.hash(usuario.password,Number(process.env.JWT_SALT))
    usuario.idRol=2;
    //guardar los datos
    console.log(usuario)
    try {
        await Usuario.create(usuario)
    } catch (error) {
        console.log('Error en la DB')
        res.status(500).json({error:'Error interno'})
        return
    }
    //enviar cookie
    const token = await jwt.generarToken(usuario)
    res.cookie(process.env.JWT_COOKIE,token,{httpOnly:true})

    res.header('auth-toke',{token}).json({
        error:null,
        msg:'autenticación correcta',
        token:token
    })
   
}

module.exports = {getRegister,postRegister}