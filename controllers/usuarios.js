 const {Usuario} = require('../models');

const getUsuarios = async (req,res)=>{
    let usuarios;
    try {
        usuarios = await Usuario.findAll()
      /*   usuarios = await Usuario.findAll({
            where:{
                idRol:2
            }
        }) */
        console.log(usuarios)
        res.render('usuarios',{usuarios,usuario:req.datos})
    } catch (error) {
        console.log('Error al traer usuarios '+error.message)
    }
}

const editUsuarios = async (req,res)=>{
    let id= req.params.id
    console.log(id)
    console.log(req.body)
    let rol=0

    /* if(req.body.rol =='Usuario' ||req.body.rol =='usuario' ){
       rol =Number(2)
    }
    if(req.body.rol =='Administrador' ||req.body.rol =='administrador' ){
       return rol = Number(1)
    } */
    try {
       let usuario = await Usuario.update({
            email:req.body.email,
            username:req.body.username,
            name: req.body.nombre,
            idRol: req.body.rol},{
                where:{
                    email:id
                }
            })
        console.log(usuario)
        res.json({status:'ok'})
    } catch (error) {
        console.log('Error' + error.message)
       return res.status(500).json({error:'No se pudo actualizar usuario'})
    }
}
const deleteUsuario = async (req,res)=>{
    let id = req.params.id
    console.log(id)
   try {
    await Usuario.destroy({
        where:{
            email: id
        }
    })
    res.json({status:'ok'})
   } catch (error) {
    console.log('Error' + error.message)
    return res.status(500).json({error:'No se pudo eliminar usuario'})
   }
}
module.exports={getUsuarios,editUsuarios,deleteUsuario} 
//-----------------------------------------
/* const db = require("../models");
const bcrypt =require("bcrypt");
const jwt = require("../utils/jwt");
require("dotenv").config();

const getUsuarios = async (req,res)=>{
    let usuarios;
    try {
        usuarios = await db.Usuario.findAll({
            where:{
                idRol:2
            }
        })
        console.log(usuarios)
        res.render('usuarios',{usuarios})
    } catch (error) {
        console.log('Error al traer usuarios '+error.message)
    }
}
const putUser = async function (req,res) {  
    let usuario = req.body
    console.log(usuario)
    if(!usuario){
        console.log("Error en los datos")
    }
    // crear un usuario 
    if(usuario.register){
        // chequeo del formulario
        // revisar si existen estos datos
        if(!usuario){
            return res.status(404).json({error:"No se encontraron datos"})
        }
    
        // chequeo password y campos vacios
        if(!usuario.password || usuario.password.trim()==""){
            return res.status(404).json({error:"No se encontraron datos"})
        }
        // chequeos de la db 
        let userDB;
        try{
            userDB=await db.Usuario.findByPk(usuario.email);
        }catch(error){
            console.log("Error DB en postRegister admin user: "+ error.message);
            return res.status(500).json({error:"Error interno"})
        }
        if(userDB){
            return res.status(500).json({error:"Usuario ya está registrado"});
        }
    
        // chequeo de username
        let usernameDB;
        try{
            usernameDB=await db.Usuario.findOne({where:{username:usuario.username}});
    
        }catch (error){
            console.log("Error DB en postRegister user: "+ error.message);
            return res.status(500).json({error:"Error interno"})
        }
        if(usernameDB){
            return res.status(500).json({error:"username ya está en usp, elija otro"});
        }
        // todo ok, encriptamos y damos rol
        usuario.password = await bcrypt.hash(usuario.password,Number(process.env.JWT_SALT));
        usuario.idRol=Number(usuario.idRol);
        // guardar los datos
        try{
            await db.Usuario.create(usuario);
    
        }catch (error){
            console.log("Error DB en postRegister user: "+ error.message);
            return res.status(500).json({error:"Error interno"})
        }        
    }

    // editar usuario
    if(req.body.userpost){
        
        let rol;
        if(req.body.rol== 'Usuario' || req.body.rol== 'usuario'){
            rol=2
        } 
        if(req.body.rol== 'Administrador' || req.body.rol== 'administrador'){
            rol=1
        }
        try {
            const datos=await db.Usuario.update({
                username:req.body.usuario[1],
                nombre:req.body.usuario[1],
                email:req.body.email,
                idRol:rol
            },{
                where:{
                    username:req.body.usuario[0]
            }});
            console.log(datos)
        } catch (error){
            console.log("Error al sincronizar "+ error.message)
        }
    }
    // borrar usuario
    if(req.body.userdelete){
        try {
            const datos=await db.Usuario.destroy({
                where:{
                    username:req.body.usuario[0]
            }});
        } catch (error){
            console.log("Error al sincronizar "+ error.message)
        }
    }
    res.redirect("/usuarios");
} */

//volver al admin
/* const volver =  function (req,res) {  
    res.redirect("/usuarios");
 }
 module.exports = {getUsuarios} */