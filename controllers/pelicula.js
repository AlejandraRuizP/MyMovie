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
        /*  pelicula = await sequelize.query(
             `SELECT "calificacion","emailUsuario","id","nombre","year","director","casting","sinopsis","genero","trailer" FROM "Peliculas" P
             LEFT JOIN "Calificaciones" C ON C."idPelicula"=P."id" 
             WHERE "id"= '${id}'`,
             {
                 replacements:['active'],
                 type:QueryTypes.SELECT
             }
         )
         console.log(pelicula)
         console.log(pelicula.length)
          if(pelicula.length > 1){
             console.log(pelicula.length)
             pelicula = pelicula.filter( p =>
                 p.emailUsuario == req.datos.email
            )
         } */
        
         console.log(pelicula.emailUsuario +' ; '+req.datos.email)
        /*  pelicula = pelicula.filter( p =>
              p.emailUsuario == req.datos.email
         )
         console.log( 'test '+JSON.stringify(pelicula,null,2)) */
        
     } catch (error) {
         console.log('Error al buscar Pelicula '+error.message)
     }
    
    const img = fs.readdirSync('public/img');
    //console.log(img)

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
        datos = await Pelicula.findAll()
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
    console.log(pelicula)
    //console.log(pelicula.ruta)
    return res.render('pelicula',{pelicula,datos,usuario:req.datos})
}


module.exports={getPelicula}

