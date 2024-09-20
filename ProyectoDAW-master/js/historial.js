document.addEventListener('DOMContentLoaded', () => {
    const historialTable = document.getElementById('historial-table');

     const usuarioEnSesion = sessionStorage.getItem('usuario');

    // Realizar solicitud GET a la API
    fetch(`https://652f649a0b8d8ddac0b26e29.mockapi.io/notas`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Limpiar el contenido actual de la tabla
        historialTable.innerHTML = '';

        // Crear filas de la tabla con los datos obtenidos de la API
        data.forEach(nota => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nota.Titulo}</td>
                <td>${nota.Tipo}</td>
                <td>${nota.Contenido}</td>
                <td>${new Date(nota.Fecha * 1000).toLocaleString()}</td>
                <td><button class="btn btn-primary" onclick="editarNota(${nota.id})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminarNota(${nota.id})">Eliminar</button></td>
            `;
            historialTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        historialTable.innerHTML = 'Error al cargar el historial.';
    });
});

// Función para eliminar una nota
function eliminarNota(id) {
    const confirmarEliminacion = confirm("¿Seguro que deseas eliminar esta nota?"); // Pregunta al usuario si está seguro

    if (confirmarEliminacion) {
        fetch(`https://652f649a0b8d8ddac0b26e29.mockapi.io/notas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Eliminación exitosa
                alert("La nota ha sido eliminada exitosamente.");
                location.reload();
            } else {
                // Error al eliminar la nota
                console.error('Error al eliminar la nota.');
                alert("Error al eliminar la nota.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error al eliminar la nota.");
        });
    }
}

function editarNota(id) {
    // Realizar solicitud GET para obtener los detalles de la nota con el ID específico
    fetch(`https://652f649a0b8d8ddac0b26e29.mockapi.io/notas/${id}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(nota => {
        // Mostrar un formulario de edición con los datos actuales de la nota
        const formularioEdicion = document.createElement('form');
        formularioEdicion.classList.add('container', 'mt-4');

        formularioEdicion.innerHTML = `
            <div class="mb-3">
                <label for="titulo" class="form-label text-white">Título:</label>
                <input type="text" class="form-control text-black" id="titulo" value="${nota.Titulo}">
            </div>
            <div class="mb-3">
                <label for="tipo" class="form-label text-white">Tipo:</label>
                <input type="text" class="form-control text-black" id="tipo" value="${nota.Tipo}">
            </div>
            <div class="mb-3">
                <label for="contenido" class="form-label text-white">Contenido:</label>
                <textarea class="form-control text-black" id="contenido">${nota.Contenido}</textarea>
            </div>
            <button class="btn btn-primary" onclick="actualizarNota(${id})">Guardar</button>
        `;

        document.body.appendChild(formularioEdicion);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al obtener los detalles de la nota para editar.');
    });
}


function actualizarNota(id) {
    const titulo = document.getElementById('titulo').value;
    const tipo = document.getElementById('tipo').value;
    const contenido = document.getElementById('contenido').value;

    const nota = {
        Titulo: titulo,
        Tipo: tipo,
        Contenido: contenido,
    };

    fetch(`https://652f649a0b8d8ddac0b26e29.mockapi.io/notas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
    })
    .then(response => {
        if (response.ok) {
            alert('La nota ha sido actualizada exitosamente.');
            location.reload(); 
        } else {
            console.error('Error al actualizar la nota.');
            alert('Error al actualizar la nota.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar la nota.');
    });
}