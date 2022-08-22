const {Pelicula} = require('../models')

const editPelicula = async (req,res)=>{
    console.log(req.body)
    console.log(req.params)
    let id= req.params.id
    let peliculaEdit;
    try {
         peliculaEdit = await Pelicula.update({
            nombre:req.body.nombre,
            year:req.body.year,
            director:req.body.director,
            casting:req.body.casting,
            sinopsis:req.body.sinopsis,
            genero:req.body.genero,
            trailer:req.body.trailer,
            vigente:Number(req.body.vigente)},{
                where:{
                    id:req.params.id
                }
         })
         console.log(peliculaEdit)
         res.json({status:'Pelicula actualizada'})
        
     } catch (error) {
         console.log('Error al buscar Pelicula '+error.message)
         return res.status(500).json({error:'No se pudo actualizar pelicula'})
     }
}
module.exports={editPelicula}