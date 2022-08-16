
const {Pelicula, sequelize} = require('../models')
const {QueryTypes} = require('sequelize')
const fs = require('fs')
const { ALL } = require('dns')

const getHome = async (req,res)=>{
    console.log('Datos '+req.datos)
    let datos;
    let datos2;
    try {
        datos = await Pelicula.findAll()
        //console.log(JSON.stringify(datos,null,2))
        
    } catch (error) {
        console.log('Error al traer peliculas'+error.message)
    }
    try {
        datos2 = await Pelicula.findAll({offset: 27, limit: 3 })
        console.log(JSON.stringify(datos2,null,2))
        
    } catch (error) {
        console.log('Error al traer peliculas al carrusel'+error.message)
    }
    
    const img = fs.readdirSync('public/img');
    //console.log(img)

    datos.forEach(async  p=> {
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
    console.log(datos[1].id)
    console.log(datos[8].ruta)
    if(req.datos){
        return res.render('index',{datos,datos2,usuario:req.datos})
    }
    if(!req.datos){
        return res.render('index2',{datos,datos2,usuario:req.datos})
    }
}
//exportar funciones
module.exports={getHome}