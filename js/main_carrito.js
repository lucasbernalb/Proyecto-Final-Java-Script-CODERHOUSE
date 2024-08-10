function renderCarrito() {
    const carrito = cargarCarritoLocalS();
    let contenidoHTML;

    if (totalProductos() > 0) {

         contenidoHTML = `<table class="table"
        <tbody>
        <tr>
        <td class="text-end" colspan="4"><button class="btn btn-danger btn-sm" onclick="vaciarCarrito();">Vaciar carrito <i class="bi bi-trash3"></i></td>
        </tr>`;
    
        for (const producto of carrito) {
            contenidoHTML += `<tr>
            <td>
            <img src="${producto.imagen}" alt="${producto.nombre}" width="40"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="text-center align-middle"><span class="text-danger">$${producto.precio} UYU</span></td>
            <td class="text-end align-middle"><button class="btn btn-danger btn-sm" onclick="eliminarCarritoLS(${producto.id});">Eliminar <i class="bi bi-trash3"></i></button></td>
            </tr>`;
        }
        
        contenidoHTML += `</tbody>
        </table>`;

    }   else {
        contenidoHTML = 
        `<div class="alert alert-danger my-5 text-center" role="alert">
            <h1>❌</h1>
            <h3>No se encontro ningun producto en el Carrito</h3>
            
        </div>`;
    }
    
    
    

    document.getElementById("productos").innerHTML = contenidoHTML;
}

renderCarrito();
renderBotonCarrito();
descuentoProductosCarrito();