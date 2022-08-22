
window.onload = ()=>{
   
    const form = document.querySelector('#form')
    const meGusta = document.querySelector('.megusta')
    const noMeGusta = document.querySelector('.noMegusta')
    const modificar = document.querySelector('.cambio')

    const agregarAlert = document.querySelector('#agregar')
    const eliminarAlert = document.querySelector('#eliminar')
    const cambioAlert = document.querySelector('#cambio')


    meGusta.addEventListener('click', async(e)=>{
        e.preventDefault()
        console.log('megusta')
        console.log(meGusta.textContent)
        console.log(meGusta.id)
        let id = meGusta.id
        const calificacion ={
            idPelicula : id,
            calificación: 1
        }
        let respuesta = await fetch('/calificaciones',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(calificacion)
        })
        let datos = await respuesta.json()
        console.log(datos)
        alertA(agregarAlert)
       
    })
    noMeGusta.addEventListener('click', async (e)=>{
        e.preventDefault()
        let id = noMeGusta.id
        let respuesta = await fetch('/calificaciones/'+meGusta.id,{
            method:'DELETE',
    
        })
        let datos = await respuesta.json()
        console.log(datos)
        alertA(eliminarAlert)
    })
    modificar.addEventListener('click', async (e)=>{
        e.preventDefault()
        console.log(modificar.id)
        let id = modificar.id
        let dataEdit = {
            nombre: form.nombre.value,
            sinopsis:form.sinopsis.value,
            director:form.director.value,
            casting:form.casting.value,
            genero:form.genero.value,
            year:form.year.value,
            trailer:form.trailer.value,
            vigente:form.vigente.value
        }
        console.log(dataEdit)
        let respuesta = await fetch('/editpelicula/'+modificar.id,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(dataEdit)
        })
        let datos = await respuesta.json()
        console.log(datos)
        alertA(cambioAlert)
    })
    function alertA(alerta){
        alerta.style.display = 'inline'
        setTimeout(()=>{
            alerta.style.display = 'none'
        }, 1000)
    }
}
