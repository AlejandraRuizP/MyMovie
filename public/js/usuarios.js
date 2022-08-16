window.onload = ()=>{
    const $ =(tag)=>{
        return document.querySelector(tag).value
    }
    const btnEdit = document.querySelectorAll('.btnEditar')
    const btnDelete = document.querySelectorAll('.btnEliminar')
    const btns = document.querySelectorAll('button')
    const form = document.querySelectorAll('form')

   for(i=0;i< btnEdit.length;i++){
    btnEdit[i].addEventListener('click', async(e)=>{
        e.preventDefault()
        console.log(e.target.name)
        id = e.target.name
        let dataEdit = {
            nombre: $('#nombre'),
            email:$('#email'),
            username:$('#username'),
            rol:$('#rol')
        }
        console.log(dataEdit)
       try {
        const response = await fetch('http://localhost:3000/usuarios/'+id,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(dataEdit)
        })
        let datos = await response.json()
        console.log(datos)
       } catch (error) {
        console.log(error.message)
       } 
       location.reload();
    })
   }
 
    for (i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener('click',(e)=>{
            e.preventDefault()
            console.log(e.target.name)
            let id=e.target.name
           try {
            eliminarUsuario(id)
            location.reload();
           } catch (error) {
                console.log(error.message)
           } 
        })
    }

    const eliminarUsuario = async (id)=>{
        const response = await fetch('http://localhost:3000/usuarios/'+id,{
            method: 'DELETE',
        })
    }
    const editarUsuario = async (id,data)=>{
        const response = await fetch('http://localhost:3000/usuarios/'+id,{
            method: 'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
        let datos = await response.json()
        console.log(datos)
    }
}


