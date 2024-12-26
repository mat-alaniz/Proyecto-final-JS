const mostrarProductos = document.getElementById('mostrarProductos');



const getProductos = async () => {
    try {
        const res = await axios.get("http://localhost:3000/productos");
        const productos = res.data;
        mostrarProductos.innerHTML = ""; // Clear existing content

        productos.forEach((producto) => {
            mostrarProductos.innerHTML += `
            <div class="card card-hover" style="width: 18rem; margin: 10px;">
                <div class="imagen-container">
                    <img src="${producto.imagen}" class="card-img-top img-carrito w-100" alt="${producto.nombre}">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title title">${producto.nombre}</h5>
                    <button type="button" class="btn btn-primary" onclick='detallesProducto(${JSON.stringify(producto.nombre)}, ${JSON.stringify(producto.color)}, ${JSON.stringify(producto.imagen)}, ${JSON.stringify(producto.tipo)}, ${JSON.stringify(producto.calidad)})'>
                        Ver mas
                    </button>
                </div>
            </div>
            `;
        });
    } catch (error) {
        console.log(error);
    }
};


const detallesProducto = (nombre, color, imagen, tipo, calidad) => {
    Swal.fire({
        title: `${nombre}`,
        html: `
        <div class="imagen-container">
            <img class="img-thumbnail img-carrito imagen-zoom" style="width: 300px; height: 400px;" src="${imagen}" alt="${nombre}">
        </div>
        <p>Color: ${color}</p>
        <p>Tipo:${tipo}</p>
        <p>Calidad: ${calidad}</p>
      `,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d40b0b',
    });
};
getProductos();