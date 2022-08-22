
window.onload = ()=>{
   
    const form = document.querySelector('#form')
    const meGusta = document.querySelector('.megusta')
    const noMeGusta = document.querySelector('.noMegusta')
    const modificar = document.querySelector('.cambio')

    const agregarAlert = document.querySelector('#agregar')
    const eliminarAlert = document.querySelector('#eliminar')
    const cambioAlert = document.querySelector('#cambio')
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
}
