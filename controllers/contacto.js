const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const getContact = (req,res)=>{
    res.render('contacto',{usuario:req.datos})
}

const postContact = (req,res)=>{
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    let mensaje = 'Mensaje formulario \n';
    mensaje+= req.body.nombre+'\n';
    mensaje+= req.body.email+'\n';
    mensaje+= req.body.contenido+'\n';

    let mail = {
        from : req.body.email,
        to: process.env.EMAIL,
        subject: 'Info web de peliculas',
        text: mensaje
    }

    transporter.sendMail(mail,(err,res)=>{
        if(err){
            console.log(err.message)
            
        }else{
            console.log('Email enviado')
        }
    })
   res.redirect('/contacto')
}
module.exports={getContact,postContact}