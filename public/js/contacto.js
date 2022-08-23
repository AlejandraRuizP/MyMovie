window.onload = ()=>{
    const btnEnviar = document.querySelector('#enviar');
    const form = document.querySelector('#form');
    
    const email = async(email)=>{
        let response = await fetch('/contacto',{
            method:'POST',
            headers:{'Content-Type':'application/Json'},
            body: JSON.stringify(email)

        })
        let datos = await response.json()
        console.log(datos)
    }
    
    
    btnEnviar.addEventListener('click',(e)=>{
        e.preventDefault()
        let datosEmail = {
            nombre: form.nombre.value,
            email: form.email.value,
            contenido:form.textarea.value
        }
        email(datosEmail)
        
    })
}