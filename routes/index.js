//carga de librerias
const express = require('express')
const fs = require('fs')
const path = require('path')//separar el nombre del archivo

//crear un router donde se guardaran las rutas
const router = express.Router();
//guardar el nombre de este archivo(index.js)
const basename = path.basename(__filename);

//leer los archivos que hay en la carpeta
fs
  .readdirSync(__dirname)
  .filter(file => {
    //archivos no deben comenzar por punto(.)
    //el archivo debe ser diferente al archivo actual
    //el archivo debe contener extensión .js
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    //router.use("/login",require("./routes/login.js"))
    router.use('/'+path.parse(file).name,require('./'+path.parse(file).base));
  });

module.exports = router;

