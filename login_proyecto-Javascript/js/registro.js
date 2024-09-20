const registroform = document.querySelector('#forminicio')
registroform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const nombreusuario=document.querySelector('#nombreusuario').value
    const apellidousuario=document.querySelector('#apellidousuario').value
    const correousuario = document.querySelector('#correousuario').value
    const duiusuario= document.querySelector('#duiusuario').value
    const password = document.querySelector('#password').value

    const usuarios = JSON.parse(localStorage.getItem('usuario')) || []
    const isUserRegistered = usuarios.find(user => user.correousuario === correousuario)
    if(isUserRegistered){
        return alert('El usuario ya esta registado!')
    }

    usuarios.push({nombreusuario: nombreusuario, apellidousuario: apellidousuario ,correousuario: correousuario, duiusuario: duiusuario ,password: password})
    localStorage.setItem('usuario', JSON.stringify(usuarios))
    alert('Registro Exitoso!')
    window.location.href = 'login.html'

})