document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registro-form");
    const usuarioInput = document.getElementById("usuario");
    const contrasenaInput = document.getElementById("contrasena");

    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = usuarioInput.value;
        const contrasena = contrasenaInput.value;

        const datosUsuario = {
            Usuario: usuario,
            contrasena: contrasena
        };

        fetch('https://652f649a0b8d8ddac0b26e29.mockapi.io/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al registrar el usuario');
            }
        }).then(data => {
            console.log('Usuario registrado con éxito:', data);
            // Limpiar los campos del formulario
            usuarioInput.value = '';
            contrasenaInput.value = '';
        }).catch(error => {
            console.error('Error:', error);
            
        });
    });
});
