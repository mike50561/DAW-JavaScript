document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const usuarioInput = document.getElementById("usuario");
    const contrasenaInput = document.getElementById("contrasena");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = usuarioInput.value;
        const contrasena = contrasenaInput.value;

        // Envia los datos de inicio de sesión al servidor, utilizando una solicitud POST
        fetch('https://652f649a0b8d8ddac0b26e29.mockapi.io/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener los datos de los usuarios');
            }
        }).then(data => {
            const usuarioEncontrado = data.find(registro => registro.Usuario === usuario);
            if (usuarioEncontrado && usuarioEncontrado.contrasena === contrasena) {
            
                sessionStorage.setItem('usuario', usuario);

                window.location.href = "inicio.html";
            } else {
                // Datos de inicio de sesión incorrectos
                alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    });
});
