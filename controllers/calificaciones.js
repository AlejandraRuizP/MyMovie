const {Calificaciones, sequelize} = require('../models')
const {QueryTypes} = require('sequelize')
const { Op } = require("sequelize");
const fs = require('fs')

const getCalificaciones = async (req,res)=>{
    console.log(req.datos)
    id = req.datos.email
   try {
    let calificacion = await sequelize.query(
        `SELECT "nombre","idPelicula", "emailUsuario", "calificacion" FROM "Calificaciones"	C JOIN "Peliculas" P ON P."id"=C."idPelicula" WHERE "emailUsuario"= '${req.datos.email}'` ,
        {
            replacements:['active'],
            type:QueryTypes.SELECT
        } 
    )
    calificacion.map( c => console.log(c.idPelicula))
    const img = fs.readdirSync('public/img');

    calificacion.forEach( p => {
        let archivo= img.filter( i =>
            i.split('.')[0]==p.idPelicula
        )

        if(archivo.length == 0){
            p.ruta = 'img/noimg.png'
        }else{
            p.ruta ='img/'+archivo[0]
        }
    });
    res.render('calificaciones',{usuario:req.datos,calificacion})
   
   } catch (error) {
        console.log(error.message)
        return res.status(404).json({error:'No se pudo buscar las calificaciones'})
   }
}

const postCalificaciones = async (req,res)=>{
    const calificacion = {
        idPelicula: req.body.idPelicula,
        calificacion: req.body.calificación,
        emailUsuario:req.datos.email
    }
    console.log('calificaciones'+JSON.stringify(calificacion))
    try {
        await Calificaciones.create(calificacion)
        console.log('Calificación creada')
    } catch (error) {
        console.log('error'+ error.message)
        return res.status(404).json({error:'No se pudo crear la calificación'})
    }
    res.send(req.datos)
}

const deleteCalificacion = async (req,res)=>{
    let id = req.params.id
    console.log(id)
    try {
        await Calificaciones.destroy({
            where:{
                [Op.and]:[
                    {idPelicula:req.params.id},
                    {emailUsuario: `${req.datos.email}`}
                ]
            }
        })
        res.json({status:'ok'})
    } catch (error) {
        console.log('Error' + error.message)
    return res.status(500).json({error:'No se pudo eliminar calificación'})
    }
}
module.exports={getCalificaciones, postCalificaciones,deleteCalificacion}