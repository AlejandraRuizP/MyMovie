const {Pelicula, sequelize} = require('../models')
const fs = require('fs')

const getPelicula = async (req,res)=>{
    console.log('pelicula2')
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
         console.log( 'test '+JSON.stringify(pelicula,null,2)) 
        
     } catch (error) {
         console.log('Error al buscar Pelicula '+error.message)
     }
    
    const img = fs.readdirSync('public/img');
    let archivo=img.filter( i =>
        i.split('.')[0]== id
    )
    //console.log(archivo)
    if(archivo.length==0){
        pelicula.ruta='../img/noimg.png'
    }else{
        pelicula.ruta='../img/'+archivo[0]
    }

    let datos;
    try {
        datos = await Pelicula.findAll({
            where:{
                vigente:1
            }
        })
        //console.log(JSON.stringify(datos,null,2))
        
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
    return res.render('pelicula2',{pelicula,datos})
}
module.exports={getPelicula}