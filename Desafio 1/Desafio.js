document.addEventListener('DOMContentLoaded', function () {
    const eventoForm = document.getElementById('eventoForm');
    const tituloInput = document.getElementById('titulo');
    const descripcionInput = document.getElementById('descripcion');
    const fechaInput = document.getElementById('fecha');
    const lineaTiempo = document.getElementById('lineaTiempo');
    
    const eventos = [];

    function agregarEvento(evento) {
        eventos.push(evento);
        eventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        mostrarEventos();
    }

    function mostrarEventos() {
        lineaTiempo.innerHTML = '';
        eventos.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.classList.add('evento', 'mb-3', 'p-3', 'border');
            eventoDiv.innerHTML = '<div class="evento-contenido">' + evento.titulo + '<br>' + evento.descripcion + '<br>' +evento.fecha +'</div>';
            lineaTiempo.appendChild(eventoDiv);
        });
    }

    eventoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const titulo = tituloInput.value;
        const descripcion = descripcionInput.value;
        const fecha = fechaInput.value;
    
        agregarEvento({ titulo, descripcion, fecha });
    
        tituloInput.value = '';
        descripcionInput.value = '';
        fechaInput.value = '';
    });
});
