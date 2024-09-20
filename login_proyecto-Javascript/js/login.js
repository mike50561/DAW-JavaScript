const formsesion = document.querySelector('#formsesion')
formsesion.addEventListener('submit', (e)=>{
    e.preventDefault()
    const correousuario = document.querySelector('#correousuario').value
    const password = document.querySelector('#password').value
    const usuarios = JSON.parse(localStorage.getItem('usuario')) || []
    const validUser = usuarios.find(user => user.correousuario === correousuario && user.password === password)
    if(!validUser){
        return alert('Usuario y/o contraseña incorrectos!')
    }
    alert(`Bienvenido ${validUser.nombreusuario}`)
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'index.html'   

})