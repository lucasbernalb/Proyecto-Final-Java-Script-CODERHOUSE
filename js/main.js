// function renderProductos() {
//     let contenidoHTML = "";

//     for(const producto of productos) {
//         contenidoHTML += `<div class="col-md-3 my-4">
//         <div class="card border-1">
//             <a href="/producto.html" onclick="guardarProductoLS(${producto.id});">
//                 <img src="${producto.imagen}" class="card-img-top"  alt="${producto.nombre}">
//             </a>
//             <div class="card-body text-center">
//                 <p class="card-text"><b>${producto.nombre}</b><br><span class="text-danger">$${producto.precio} UYU</span></p>
//                 <p class="card-text"><button class="btn btn-danger rounded-2" onclick="agregarProductos(${producto.id});">Agregar <i class="bi bi-cart-plus"></i></button></p>
//             </div>
//         </div>
//         </div>`;
//     }

//     document.getElementById("productos").innerHTML = contenidoHTML;
// }

renderProductos(productos);
renderBotonCarrito();