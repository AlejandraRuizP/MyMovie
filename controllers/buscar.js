const {Pelicula} = require('../models')
const {Op} = require('sequelize')
const fs = require('fs')


const getNavbar = async (req,res)=>{
    console.log(req.datos)
    console.log(req.query.busqueda)
   let parametro = req.query.busqueda
    let datos;
    try {
        datos = await Pelicula.findAll({
            where:{
                vigente:1
            }
        })
        datos = datos.filter( e => e.nombre.toLowerCase().includes((parametro))) 
         const img = fs.readdirSync('public/img');

    datos.forEach(async  p=> {
        let archivo=img.filter( i =>
            i.split('.')[0]== p.id
        )
        if(archivo.length==0){
            p.ruta='img/noimg.png'
        }else{
            p.ruta='img/'+archivo[0]
        }
    });
    return res.render('buscar',{datos})
        
    } catch (error) {
        console.log(error.message)
        res.send('no se pudo buscar')
    }
   
    
}
module.exports={getNavbar}