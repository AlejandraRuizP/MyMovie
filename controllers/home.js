
const {Pelicula, sequelize} = require('../models')
const {QueryTypes} = require('sequelize')
const fs = require('fs')
const { ALL } = require('dns')

const getHome = async (req,res)=>{
    //console.log('Datos '+req.datos)
    let datosAdmin;
    let datosUser;
    try {
        datosAdmin = await Pelicula.findAll()
        
    } catch (error) {
        console.log('Error al traer peliculas'+error.message)
    }
    try {
        datosUser = await Pelicula.findAll({
            where:{
                vigente:1
            }
        })
        console.log(JSON.stringify(datos2,null,2))
        
    } catch (error) {
        console.log('Error al traer peliculas al carrusel'+error.message)
    }
    
    const img = fs.readdirSync('public/img');

    datosAdmin.forEach(async  p=> {
        let archivo=img.filter( i =>
            i.split('.')[0]== p.id
        )
        console.log(archivo)
        if(archivo.length==0){
            p.ruta='img/noimg.png'
        }else{
            p.ruta='img/'+archivo[0]
        }
    });
    datosUser.forEach(async  p=> {
        let archivo=img.filter( i =>
            i.split('.')[0]== p.id
        )
        console.log(archivo)
        if(archivo.length==0){
            p.ruta='img/noimg.png'
        }else{
            p.ruta='img/'+archivo[0]
        }
    });
    
    
    if(req.datos){
        if(req.datos.rol == 1){
            return res.render('indexAdmin',{datosAdmin,datosUser,usuario:req.datos}) 
        }else{
            return res.render('indexUser',{datosUser,usuario:req.datos}) 
        }
    }
    if(!req.datos){
        return res.render('index',{datosUser,usuario:req.datos})
    }
}
module.exports={getHome}