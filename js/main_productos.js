function renderProductos() {
    const producto = cargarProductoLS();
    let htmlImagenPorducto = `<img class="" src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}" />`;
    let htmlDetalleProducto = `<h1>${producto.nombre}</h1>
    <p class="text-danger fs-3">$${producto.precio} UYU</p>
    <p class="">Recuerda que cada <b>cuadro</b> es totalmente original y fabricado por la artista <b>Andrea Bernasconi</b>.</p>
    <div class="mt-5">
    <p class="card-text me-2"><button class="btn btn-danger rounded-2 ms-1 text-uppercase" onclick="agregarProductos(${producto.id});">Agregar <i class="bi bi-bag-plus-fill"></i></button>
    <a href="carrito.html" <button class="btn btn-dark rounded-2 ms-4 text-uppercase" onclick="">Ver Carrito <i class="bi bi-cart2"></i></button></a></p>
    </div>`;
    document.getElementById("imagenProducto").innerHTML = htmlImagenPorducto;
    document.getElementById("detalleProducto").innerHTML = htmlDetalleProducto;
}

renderProductos();
renderBotonCarrito();
