const getAdmin = (req,res)=>{
    res.render('admin',req.datos)
}

module.exports={getAdmin}