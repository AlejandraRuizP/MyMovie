
window.onload = ()=>{
    const modalBody = document.querySelector('.modal-body')
    const modalFooter = document.querySelector('.modal-footer')
    const btnEdit = document.querySelectorAll('.btnEditar')
    const btnDelete = document.querySelectorAll('.btnEliminar')
    const btnCambios = document.querySelector('.cambios')
    const btnCerrar = document.querySelector('.cerrar')
    const form = document.querySelectorAll('#form')
    
   for(let i=0;i< btnEdit.length;i++){
    btnEdit[i].addEventListener('click', async(e)=>{
        e.preventDefault()
        console.log(e.target.name)
        let id = e.target.name
        
       try {
            const response = await fetch(`/usuarios/${id}`)
            let datos = await response.json()
                console.log(datos)
                for( let i=0; i< datos.usuarioP.length;i++){
                modalBody.innerHTML = `<input class="form-control"  id="name" name="nombre" type="text" class="card-title" style="color:black;" value="  ${datos.usuarioP[i].name}"><br>
                <input class="form-control"  id="email" name="email" type="text" class="card-title" value="${datos.usuarioP[i].email}"><br>
                <input class="form-control"  id="username" name="username" type="text" class="card-title" value=" ${datos.usuarioP[i].username} "><br>
                <select class="form-select" name="rol" id="rol">
                    <option value=" ${datos.usuarioP[i].idRol}"> ${datos.usuarioP[i].idRol == 2 ? "Usuario" : "Administrador"} </option>
                    <option value=" ${datos.usuarioP[i].idRol==2?1:2}"> ${datos.usuarioP[i].idRol == 2 ? "Administrador" : "Usuario"} </option>
                    <option value="${datos.usuarioP[i].idRol ==2?1:2}> ${datos.usuarioP[i].idRol == 2 ? "Administrador" : "Usuario"} </option>
                </select><br>
                ` 
                btnCambios.id = `${datos.usuarioP[i].email}`
               }
            
        } catch (error) {
            console.log(error)
        }
    })
   }
   
   btnCambios.addEventListener('click',(e)=>{
    console.log(e.target.id)
    let id = e.target.id
    const data = {
        email:document.querySelector('#email').value,
        username:document.querySelector('#username').value,
        name:document.querySelector('#name').value,
        idRol:document.querySelector('#rol').value
    }
    editarUsuario(id,data)
    
   })
 
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener('click',(e)=>{
            e.preventDefault()
            console.log(e.target.name)
            let id= e.target.name
           try {
            eliminarUsuario(id)
            location.reload();
           } catch (error) {
                console.log(error.message)
           } 
        })
    }
    const eliminarUsuario = async (id)=>{
        const response = await fetch(`/usuarios/${id}`,{
            method: 'DELETE',
        })
        let datos = await response.json()
        console.log('Error: No se puede eliminar usuario mientras tenga favoritos')
    }
    const editarUsuario = async (id,data)=>{
        const response = await fetch('/usuarios/'+id,{
            method: 'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
        console.log(data)
        let datos = await response.json()
        console.log(datos)
        if(datos){
            location.reload()
        }
    }
}


