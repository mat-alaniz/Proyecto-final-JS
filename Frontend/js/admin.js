const nombreProucto = document.getElementById("inputNombre");
const inputTipo = document.getElementById("inputTipo")
const inputCalidad = document.getElementById("inputCalidad")
const inputColor = document.getElementById("inputColor")
const inputImagen = document.getElementById("inputImagen");
const cargarProductos = document.getElementById("cargarProductos");
const tablaProductos = document.getElementById("tablaProductos");
const btnEditar = document.getElementById("btnEditar");

let ID = "";
const validarNombre = () => {
    const nombre = nombreProucto.value;

    if (nombre.trim().length <= 3) {
        nombreProucto.classList.add("is-invalid");
        nombreProucto.classList.remove("is-valid");
        return false
    }
    nombreProucto.classList.remove("is-invalid");
    nombreProucto.classList.add("is-valid");
    return true
}
const validarTipo = () => {
    const nombre = inputTipo.value;

    if (nombre.trim().length <= 3) {
        inputTipo.classList.add("is-invalid");
        inputTipo.classList.remove("is-valid");
        return false
    }
    inputTipo.classList.remove("is-invalid");
    inputTipo.classList.add("is-valid");
    return true
}
const validarCalidad = () => {
    const nombre = inputCalidad.value;

    if (nombre.trim().length <= 3) {
        inputCalidad.classList.add("is-invalid");
        inputCalidad.classList.remove("is-valid");
        return false
    }
    inputCalidad.classList.remove("is-invalid");
    inputCalidad.classList.add("is-valid");
    return true
}
const validarColor = () => {
    const nombre = inputColor.value;

    if (nombre.trim().length <= 3) {
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid");
        return false
    }
    inputColor.classList.remove("is-invalid");
    inputColor.classList.add("is-valid");
    return true
}
const validarImagen = () => {
    const nombre = inputImagen.value;

    if (nombre.trim().length <= 3) {
        inputImagen.classList.add("is-invalid");
        inputImagen.classList.remove("is-valid");
        return false
    }
    inputImagen.classList.remove("is-invalid");
    inputImagen.classList.add("is-valid");
    return true
}


nombreProucto.addEventListener("blur", validarNombre);
inputTipo.addEventListener("blur", validarTipo);
inputCalidad.addEventListener("blur", validarCalidad);
inputColor.addEventListener("blur", validarColor);
inputImagen.addEventListener("blur", validarImagen);

const postProducto = async () => {

    try {
        const nuevoProducto = {
            nombre: nombreProucto.value,
            tipo: inputTipo.value,
            calidad: inputCalidad.value,
            color: inputColor.value,
            imagen: inputImagen.value
        }

        const response = await axios.post("http://localhost:3000/productos", nuevoProducto);
    } catch (error) {
        console.error(error);
    }

}

cargarProductos.addEventListener("click", () => {
    if (validarNombre() && validarTipo() && validarCalidad() && validarColor() && validarImagen()) {
        postProducto();
    }
})


const eliminarProducto = async (id) => {


    try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3000/productos/${id}`);
                    Swal.fire("Deleted!", "Your product has been deleted.", "success");
                    getProducts(); // Call this only after successful deletion
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "There was an error deleting the product.", "error");
                }
            }
        });
    } catch (error) {
        console.error(error);
    }

}

btnEditar.addEventListener("click", async () => {
    try {
        const productoEditado = {
            nombre: nombreProucto.value,
            tipo: inputTipo.value,
            calidad: inputCalidad.value,
            color: inputColor.value,
            imagen: inputImagen.value
        }

        const response = await axios.put(`http://localhost:3000/productos/${ID}`, productoEditado);
        getProducts();
    } catch (error) {
        console.error(error);
    }
});

const editarProducto = async (id, nombre, tipo, calidad, color, imagen) => {
    console.log(id, nombre, tipo, calidad, color, imagen);
    ID = id;
    nombreProucto.value = nombre;
    inputTipo.value = tipo;
    inputCalidad.value = calidad;
    inputColor.value = color;
    inputImagen.value = imagen;
}


const getProducts = async () => {

    try {
        const response = await axios.get("http://localhost:3000/productos");
        const productos = response.data;


        tablaProductos.innerHTML = "";
        productos.forEach(producto => {
            tablaProductos.innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.tipo}</td>
                <td>${producto.calidad}</td>
                <td>${producto.color}</td>
                <td><img src="${producto.imagen}" width="50" height="50"></td>
                <td>
                    <div>
                        <button class="btn btn-danger" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                        <button class="btn btn-warning" onclick="editarProducto('${producto.id}', '${producto.nombre}', '${producto.tipo}', '${producto.calidad}', '${producto.color}', '${producto.imagen}')">Editar</button>
                    </div>
                </td>
            </tr>`;
        });
    } catch (error) {
        console.error(error)
    }

}





getProducts()