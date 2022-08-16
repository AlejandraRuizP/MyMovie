window.onload= (e)=>{
    let form = document.querySelector('form')
    let alertMsj = document.getElementById('alert')
    form.addEventListener('submit', async(e)=>{
        e.preventDefault()//trim() -> Elimina espacios vacios
        if(form.password.value.trim()===''){ return }

        let errorMsg = document.getElementById('errorMsg')
        if(form.password.value != form.confirmacion.value){
            alertMsj.innerText='Contraseña no coincide'
            alertMsj.classList.remove('esconderError')
            alertMsj.classList.add('mostrarError')
            return;
        }
        alertMsj.classList.remove('mostrarError')
        alertMsj.classList.add('esconderError')

        const usuario = {
            email: form.email.value,
            username:form.username.value,
            name: form.nombre.value,
            password:form.password.value
        }
        
        let respuesta  = await fetch('/registro',{
            method:'Post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(usuario)
        })

        let datos = await respuesta.json();

        if(!datos){
            errorMsg.innerText='Error datos '+datos.error
            errorMsg.classList.remove('esconderError')
            errorMsg.classList.add('mostrarError')
            return;
        }
        if(datos.error){
            errorMsg.innerText='Error datos '+datos.error
            errorMsg.classList.remove('esconderError')
            errorMsg.classList.add('mostrarError')
            return;
        }

        //todo ok
        location.assign('/home')
    })
}