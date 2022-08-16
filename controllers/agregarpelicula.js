
const {Pelicula} = require('../models')
const path          = require('path')

const getNewMovie = (req,res)=>{
    res.render('agregarPelicula',{usuario:req.datos})
}

const postNewMovie = async (req,res)=>{
    console.log(req.body)
    let id;
    try {
        id = await Pelicula.max('id')+1
        console.log(id)
    } catch (error) {
        console.log('Error al buscar Id'+error.message)
    }
    const movie ={
        nombre: req.body.nombre,
        year:Number(req.body.year),
        director:req.body.director,
        casting:req.body.casting,
        sinopsis:req.body.sinopsis,
        genero:req.body.genero,
        trailer:req.body.trailer,
        vigente: req.body.vigente
    }
    console.log(movie)
    if(!movie){
        return res.status(404).json({error:'Necesita llenar todos los campos'})
    }
    if(!movie.nombre ){
        return res.status(404).json({error:'El campo nombre no puede estar vacio'})
    }
   try {
        await Pelicula.create(movie)
    } catch (error) {
        return res.status(404).json({error:'Error al crear pelicula '+error.message})
        console.log('Error al crear pelicula '+error.message)
    } 
    
    /* let archivo = req.files.portada
    console.log(archivo)
    
    let ruta ="public/img/"+id+path.extname(req.files.portada.name);
    archivo.mv(ruta,(err)=>{
    if(err){
        console.log("Error al guardad el archivo:"+err.message)
        return res.status(500).send("Error al guardar archivo")
    }
   }) */
    res.redirect('/home')
}
module.exports={getNewMovie,postNewMovie}