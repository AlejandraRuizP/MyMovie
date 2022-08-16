const {Usuario} = require('../models')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt')
require('dotenv').config()

const getLogin = (req,res)=>{
    res.render('login')
}
const postLogin = async (req,res)=>{
    console.log(req.body.email)
    if(!req.body){ return res.status(500).json({error:'Error falta completar los campos'}) }

    if(!req.body.email){ return res.status(500).json({error:'Falta email'})}
    //vienen los datos
    let usuario;
    //buscar usuario por el email
    try {
        usuario = await Usuario.findByPk(req.body.email)
        console.log(usuario)
    } catch (error) {
        console.log('Usuario no encontrado1:'+error.message)
        return res.status(500).json({error:'Error BD'})
    }
    if(!usuario){return res.status(500).json({error:'Usuario no encontrado2'})}

    if(!(await bcrypt.compare(req.body.password,usuario.password))){ return res.status(500).json({error:'Error de credenciales'})}
    //todo salio ok
    //res.send(usuario)//ya no lo necesito
    const token = await jwt.generarToken(usuario)
    //enviar cookie
    res.cookie(process.env.JWT_COOKIE,token,{httpOnly:true})
    //enviamos info en la response
    res.header('auth-token',{token}).json({
        error:null,
        msg:'autenticación correcta',
        token:token
    })
}
module.exports={getLogin,postLogin}