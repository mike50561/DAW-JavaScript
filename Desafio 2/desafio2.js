document.addEventListener("DOMContentLoaded", function () {
    var categorias = ["Electrónica", "Carro", "Escolar", "Herramientas", "Hogar"];
    var categoriaSelect = document.getElementById("producto-Categoria");

    categorias.forEach(function (categoria) {
        var option = document.createElement("option");
        option.value = categoria;
        option.text = categoria;
        categoriaSelect.appendChild(option);
    });

    document.getElementById("producto-formulario").addEventListener("submit", function (event) {
        event.preventDefault();
        var productoId = document.getElementById("producto-Id").value;
        var productoNombre = document.getElementById("producto-Nombre").value;
        var productoCantidad = document.getElementById("producto-Cantidad").value;
        var productoCategoria = categoriaSelect.value;
        var productoPrecio = document.getElementById("producto-Precio").value;
        var errorArea = document.getElementById("error-area");
        errorArea.innerHTML = "";

        var errors = [];

        if (productoId === "") {
            errors.push("El campo ID no puede estar vacío.");
        }

        if (productoCantidad <= 0) {
            errors.push("La cantidad debe ser mayor que cero.");
        }

        if (productoPrecio <= 0) {
            errors.push("El precio tiene que ser mayor $0.00");
        }

        if (errors.length > 0) {
            errors.forEach(function (error) {
                errorArea.innerHTML += error + "<br>";
            });
        } else {
            var nuevoproducto = {
                ID: productoId,
                Nombre: productoNombre,
                Cantidad: productoCantidad,
                Categoría: productoCategoria,
                Precio: productoPrecio,
            };

            var productos = JSON.parse(localStorage.getItem("productos")) || [];
            productos.push(nuevoproducto);
            localStorage.setItem("productos", JSON.stringify(productos));
            displayProducts();
            clearForm();
        }
    });

    document.getElementById("Busqueda").addEventListener("input", function () {
        var Busqueda = this.value.toLowerCase();
        var productos = JSON.parse(localStorage.getItem("productos")) || [];
        var Busquedas = productos.filter(function (producto) {
            return producto.Nombre.toLowerCase().includes(Busqueda);
        });

        var BusquedaSeleccion = document.getElementById("Busqueda-Resultado");
        BusquedaSeleccion.innerHTML = "";

        Busquedas.forEach(function (resultado) {
            var option = document.createElement("option");
            option.value = resultado.ID;
            option.text = resultado.Nombre;
            BusquedaSeleccion.appendChild(option);
        });
    });

    function displayProducts() {
        var productos = JSON.parse(localStorage.getItem("productos")) || [];
        var productoLista = document.getElementById("producto-lista");
        var tableHTML = "<tr><th>ID</th><th>Nombre</th><th>Cantidad</th><th>Categoría</th><th>Precio</th></tr>";

        productos.forEach(function (producto) {
            tableHTML += "<tr><td>" + producto.ID + "</td><td>" + producto.Nombre + "</td><td>" + producto.Cantidad +
             "</td><td>" + producto.Categoría + "</td><td>" + producto.Precio + "</td></tr>";
        });

        productoLista.innerHTML = tableHTML;
    }

    displayProducts();
});

function clearForm() {
    document.getElementById("producto-Id").value = "";
    document.getElementById("producto-Nombre").value = "";
    document.getElementById("producto-Cantidad").value = "";
    document.getElementById("producto-Precio").value = "";
}
