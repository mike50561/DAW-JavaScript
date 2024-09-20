document.addEventListener("DOMContentLoaded", function () {
    
    var categorias = ["Electrónica", "Carro", "Escolar", "Herramientas", "Hogar"];
    var categoriaSelect = document.getElementById("producto-Categoria");

    categorias.forEach(function (categoria) {
        var option = document.createElement("option");
        option.value = categoria;
        option.text = categoria;
        categoriaSelect.appendChild(option);
    });

    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    displayProducts(productos);

    document.getElementById("producto-formulario").addEventListener("submit", function (event) {
        event.preventDefault();
        var productoId = document.getElementById("producto-Id").value;
        var productoNombre = document.getElementById("producto-Nombre").value;
        var productoCantidad = document.getElementById("producto-Cantidad").value;
        var productoCategoria = categoriaSelect.value; 
        var productoPrecio = document.getElementById("producto-precio").value;
        var errorArea = document.getElementById("error-area");
        errorArea.innerHTML = "";

        var errors = [];
        var regex = /^[0-9]+$/;

        if (productoId === "" || productoNombre === "" || productoCantidad === "" || productoPrecio === "") {
            errors.push("Completa los campos");
        }
        if (!regex.test(productoId)) {
            errors.push("El campo ID solo debe contener dígitos numéricos.");
        }

        if (productos.some(producto => producto.ID === productoId)) {
            errors.push("El ID ingresado ya existe.");
        }

        if (productoCantidad <= 0 || productoPrecio <= 0) {
            errors.push("La cantidad y el precio deben ser mayores que cero.");
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

            productos.push(nuevoproducto);
            localStorage.setItem("productos", JSON.stringify(productos));
            displayProducts(productos);
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
        var productoLista = document.getElementById("producto-lista");
        var tableHTML = "<tr><th>ID</th><th>Nombre Producto</th><th>Cantidad Producto</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr>";

        var productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.forEach(function (producto, index) {
            tableHTML += "<tr><td>" + producto.ID + "</td><td>" + producto.Nombre + "</td><td>" + producto.Cantidad +
                "</td><td>" + producto.Categoría + "</td><td>" + "$" + producto.Precio + "</td><td><button data-action='eliminar' data-index='" + index +
                 "'>Eliminar</button> <button data-action='modificar' data-index='" + index + "'>Modificar</button></td></tr>";
        });

        productoLista.innerHTML = tableHTML;

        var buttons = productoLista.querySelectorAll("button");
        buttons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                var index = event.target.getAttribute("data-index");
                if (event.target.getAttribute("data-action") === "eliminar") {
                    eliminarProducto(index);
                } else if (event.target.getAttribute("data-action") === "modificar") {
                 
                    agregarEnModal(index);
                }
            });
        });
    }

    function clearForm() {
        document.getElementById("producto-Id").value = "";
        document.getElementById("producto-Nombre").value = "";
        document.getElementById("producto-Cantidad").value = "";
        document.getElementById("producto-precio").value = "";
    }

    function eliminarProducto(index) {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            var productos = JSON.parse(localStorage.getItem("productos")) || [];
            productos.splice(index, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            displayProducts();
        }
    }

    function agregarEnModal(productoID){
        var productos = JSON.parse(localStorage.getItem("productos")) || [];
        var producto = productos[productoID];
        document.getElementById("producto-Id-Editar").value =  producto.ID;
        document.getElementById("producto-Nombre-Editar").value = producto.Nombre;
       document.getElementById("producto-Cantidad-Editar").value =producto.Cantidad;
       selectCategoriasEditar = document.getElementById("producto-Categoria-Editar");
       selectCategoriasEditar.innerHTML = '';
       categorias.forEach(function (categoria) {
        var option = document.createElement("option");
        option.value = categoria;
        option.text = categoria;
        if (categoria == producto.Categoría) {
            option.selected = true;
        }
        selectCategoriasEditar.appendChild(option);
        });
        document.getElementById("producto-precio-Editar").value = producto.Precio;

        mostrarDialogo();
    
        
    }

    document.getElementById("producto-formulario-editar").addEventListener("submit", function (event) {
        event.preventDefault();
        var productoId = parseInt(document.getElementById("producto-Id-Editar").value);
        var productoNombre = document.getElementById("producto-Nombre-Editar").value;
        var productoCantidad = document.getElementById("producto-Cantidad-Editar").value;
        var productoCategoria = selectCategoriasEditar.value; 
        var productoPrecio = document.getElementById("producto-precio-Editar").value;
        var errorArea = document.getElementById("error-area-Editar");
        errorArea.innerHTML = "";

        var errors = [];
        var regex = /^[0-9]+$/;

        if (productoId === "" || productoNombre === "" || productoCantidad === "" || productoPrecio === "") {
            errors.push("Completa los campos");
        }
        if (!regex.test(productoId)) {
            errors.push("El campo ID solo debe contener dígitos numéricos.");
        }


        if (productoCantidad <= 0 || productoPrecio <= 0) {
            errors.push("La cantidad y el precio deben ser mayores que cero.");
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
            var indiceAEditar = productos.findIndex(function(producto) {
                return producto.ID == productoId;
            });
            productos[indiceAEditar] = nuevoproducto;

            console.log(productos);
            console.log(nuevoproducto);
            var productoEditar = productos.find(elemento => elemento.ID == productoId);
            console.log(productoEditar);
            productoEditar = nuevoproducto;
            console.log(productos);
            localStorage.setItem("productos", JSON.stringify(productos));
            displayProducts(productos);
            selectCategoriasEditar.innerHTML = '';
            cancelarModal();
        }
    });

    function modificarProducto(productoID) {
        var productos = JSON.parse(localStorage.getItem("productos")) || [];
        var producto = productos[productoID];
        
        var nuevoNombre = prompt("Editar nombre del producto:", producto.Nombre);
        var nuevaCantidad = prompt("Editar cantidad del producto:", producto.Cantidad);
    
        var selectCategorias = document.createElement("select");
        categorias.forEach(function (categoria) {
            var option = document.createElement("option");
            option.value = categoria;
            option.text = categoria;
            if (categorias.some(producto => producto.Categoría === categoria)) {
                option.disabled = true;
            }
            selectCategorias.appendChild(option);
        });

        var resultado = prompt('Selecciona una opción:', selectCategorias.outerHTML);

    
        selectCategorias.addEventListener("change", function () {
            var nuevaCategoria = selectCategorias.value;
    
            if (!categorias.some(categoria => categoria === nuevaCategoria)) {
                alert("La categoría seleccionada no es válida.");
                return;
            }
    
            updateProduct(productoID, nuevoNombre, nuevaCantidad, nuevaCategoria, producto.Precio);
        });
    
        var nuevoPrecio = prompt("Editar precio del producto:", producto.Precio);
    
        updateProduct(productoID, nuevoNombre, nuevaCantidad, nuevaCategoria, nuevoPrecio);
    }

    function updateProduct(productoID, nuevoNombre, nuevaCantidad, nuevaCategoria, nuevoPrecio) {
        console.log('si llego');
        var productos = JSON.parse(localStorage.getItem("productos")) || [];
        var producto = productos[productoID];
    
        if (nuevoNombre !== null) {
            producto.Nombre = nuevoNombre;
        }
    
        if (nuevaCantidad !== null) {
            producto.Cantidad = nuevaCantidad;
        }
    
        if (nuevaCategoria !== null) {
            producto.Categoría = nuevaCategoria;
        }
    
        if (nuevoPrecio !== null) {
            producto.Precio = nuevoPrecio;
        }
    
        productos[productoID] = producto;
    
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    function mostrarDialogo() {
        document.getElementById('miDialogo').style.display = 'block';
    }
   

    function obtenerSeleccion() {
        var seleccion = document.getElementById('opciones').value;
        alert('Seleccionaste la opción: ' + seleccion);
        document.getElementById('miDialogo').style.display = 'none';
    }
});

function cancelarModal() {
    document.getElementById('miDialogo').style.display = 'none';
}