 const {Usuario} = require('../models');

const getUsuarios = async (req,res)=>{
    let usuarios;
    try {
        usuarios = await Usuario.findAll()
        console.log(usuarios)
        res.render('usuarios',{usuarios,usuario:req.datos})
    } catch (error) {
        console.log('Error al traer usuarios '+error.message)
    }
}

const getUsuarioP = async (req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    let id = req.params.id
    let usuarioP;
    try {
        usuarioP = await Usuario.findAll({
            where:{
                email: id
            }
        })
        res.json({usuarioP})
       // res.render('usuarios',{usuarioP,usuario:req.datos})
    } catch (error) {
        console.log('Error al traer usuario '+error.message)
    }
}
const editUsuarios = async (req,res)=>{
    let id= req.params.id
    console.log(req.datos)
    console.log(req.body)
    let usuario;

    try {
       usuario = await Usuario.update({
            email:req.body.email,
            username:req.body.username,
            name: req.body.name,
            idRol: req.body.idRol},{
                where:{
                    email:id
                }
            })
        console.log(usuario)
        res.status(200).json({status:'Usuario actualizado'})
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
module.exports={getUsuarios,editUsuarios,deleteUsuario,getUsuarioP} 