window.onload = ()=>{
    const meGusta = document.querySelector('.megusta')
    const noMeGusta = document.querySelector('.noMegusta')
    const agregarAlert = document.querySelector('#agregar')
    const eliminarAlert = document.querySelector('#eliminar')
    const fila = document.querySelector('.contenedor-carrusel')
    const peliculas = document.querySelector('.pelicula')
    const flechaIzquierda =document.querySelector('.flecha-izquierda')
    const flechaDerecha =document.querySelector('.flecha-derecha')

    flechaDerecha.addEventListener('click',()=>{
        fila.scrollLeft += fila.offsetWidth;
    })
    flechaIzquierda.addEventListener('click',()=>{
        fila.scrollLeft -= fila.offsetWidth;
    })
    meGusta.addEventListener('click', async()=>{
        console.log('megusta')
        console.log(meGusta.textContent)
        console.log(meGusta.id)
        id = meGusta.id
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
        //agregarAlert.style.display = 'inline'
        alertA()
       
    })
    noMeGusta.addEventListener('click', async ()=>{
        id = noMeGusta.id
        let respuesta = await fetch('/calificaciones/'+meGusta.id,{
            method:'DELETE',
    
        })
        let datos = await respuesta.json()
        console.log(datos)
        //eliminarAlert.style.display = 'inline'
        alertE()
    })
    function alertA(){
        agregarAlert.style.display = 'inline'
        setTimeout(()=>{
            agregarAlert.style.display = 'none'
        }, 1000)
    }
    function alertE(){
        eliminarAlert.style.display = 'inline'
        setTimeout(()=>{
            eliminarAlert.style.display = 'none'
        }, 1000)
    }
}
