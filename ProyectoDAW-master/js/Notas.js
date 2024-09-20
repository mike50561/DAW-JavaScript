document.addEventListener("DOMContentLoaded", function () {
    const guardarNotaButton = document.getElementById("guardar-nota");
  
    guardarNotaButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      const titulo = document.getElementById("Titulo").value;
      const tipo = document.getElementById("Tipo").value;
      const contenido = document.getElementById("contenido").value;
      const fecha = Math.floor(new Date().getTime() / 1000);
      const usuario = sessionStorage.getItem('usuario');
  
      const nota = {
        Titulo: titulo,
        Tipo: tipo,
        Contenido: contenido,
        Fecha: fecha,
        Usuario: usuario
      };
  
      fetch('https://652f649a0b8d8ddac0b26e29.mockapi.io/notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nota)
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al guardar la nota');
        }
      }).then(data => {
        console.log('Nota guardada con éxito:', data);
        // Limpiar los campos del formulario
        document.getElementById("Titulo").value = '';
        document.getElementById("Tipo").value = '';
        document.getElementById("contenido").value = '';
      }).catch(error => {
        console.error('Error:', error);
      });
    });
  });
  
  