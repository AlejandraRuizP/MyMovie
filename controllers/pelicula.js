const {Pelicula, sequelize} = require('../models')
const {QueryTypes} = require('sequelize')
const fs = require('fs')

const getPelicula = async (req,res)=>{
    console.log(req.datos)
    let id= req.params.id
    let pelicula;
    let test;

    try {
         pelicula = await Pelicula.findAll({
             where:{
                 id:id
             }
         })
         console.log(pelicula.emailUsuario +' ; '+req.datos.email)
        
     } catch (error) {
         console.log('Error al buscar Pelicula '+error.message)
     }
    
    const img = fs.readdirSync('public/img');
    let archivo=img.filter( i =>
        i.split('.')[0]== id
    )
    if(archivo.length==0){
        pelicula.ruta='../img/noimg.png'
    }else{
        pelicula.ruta='../img/'+archivo[0]
    }
    //Datos carrusel
    let datos;
    try {
        datos = await Pelicula.findAll({
            where:{
                vigente:1
            }
        })
        
    } catch (error) {
        console.log('Error al traer usuarios'+error.message)
    }
    datos.forEach(async  p=> {
        let archivo=img.filter( i =>
            i.split('.')[0]== p.id
        )
        //console.log(archivo)
        if(archivo.length==0){
            p.ruta='../img/noimg.png'
        }else{
            p.ruta='../img/'+archivo[0]
        }
    });
    console.log(pelicula)
    //console.log(pelicula.ruta)
    if(req.datos.rol == 2){
        return res.render('pelicula',{pelicula,datos,usuario:req.datos})
    }
    if(req.datos.rol == 1){
        return res.render('editpelicula',{pelicula,datos,usuario:req.datos})
    }
}
module.exports={getPelicula}

