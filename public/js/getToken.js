
window.onload = function(e){
    let formulario = document.querySelector('form');
    let alertMsj = document.getElementById('alert')
    formulario.addEventListener('submit',async (e)=>{
        e.preventDefault();
        let credenciales ={
            email:formulario.email.value,
            password:formulario.password.value
        }

        let respuesta = await fetch('/login',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(credenciales)
        })
        let datos = await respuesta.json()
        if(!datos){
            alertMsj.innerText='Error en la comunicación'
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return;
        }
        //revisar si hay errores
        if(datos.error){
            alertMsj.innerText='Error datos '+datos.error
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return;
        }
        alertMsj.classList.remove('mostrarError')
        //si todso está ok:
        //opcional para cuando se trabaje con API Restful
        localStorage.setItem('TOKEN_SESION_JWT',datos.token)
        //redireccionar al home
        location.assign('/home');
    })
}