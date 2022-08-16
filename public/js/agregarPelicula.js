
window.onload = (e)=>{    
    let archivo = document.querySelector('#portada')
    let form = document.querySelector('#form');
    let alertMsj = document.querySelector('#alert');

    form.addEventListener('submit',async (e)=>{
        e.preventDefault()
        console.log('click')
        if(!form.nombre.value){
            alertMsj.innerText='El campo nombre no puede estar vacio'
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return
        }
        alertMsj.classList.remove('mostrarError')
        alertMsj.classList.add('esconderError')

        let movieData = {
            nombre : form.nombre.value,
            year : form.year.value,
            director :form.director.value,
            casting : form.casting.value,
            sinopsis : form.sinopsis.value,
            genero : form.genero.value,
            trailer : form.trailer.value,
            vigente: form.vigente.value
        }
        let formData = new FormData(e.currentTarget)
        let respuesta = await fetch('/agregarPelicula',{
            method:'POST',
            body:formData
        })
        let datos = await respuesta.json()
        if(datos.status==200){
            alertMsj.innerText='Pelicula agregada'
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return;
        }
        if(!datos){
            alertMsj.innerText='Error datos '+datos.error
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return;
        }
        if(datos.error){
            alertMsj.innerText= 'Error'+datos.error
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return
        }
    })

}