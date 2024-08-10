async function renderProductos() {
    const response = await fetch("json/productos.json");
    const data = await response.json();

    let contenidoHTML = "";

    data.forEach(element => {
        contenidoHTML += `<div class="col-md-3 my-4">
        <div class="card border-1">
            <a href="/producto.html" onclick="guardarProductoLS(${element.id});">
                <img src="${element.imagen}" class="card-img-top"  alt="${element.nombre}">
            </a>
            <div class="card-body text-center">
                <p class="card-text"><b>${element.nombre}</b><br><span class="text-danger">$${element.precio} UYU</span></p>
                <p><button class="btn btn-danger rounded-2" onclick="agregarProductos(${element.id});">Agregar <i class="bi bi-cart-plus"></i></button></p>
                <a href="carrito.html" <button class="btn btn-dark" onclick="">Carrito <i class="bi bi-cart2"></i></button></a>
            </div>
        </div>
        </div>`;
    }); 
        
    document.getElementById("productos").innerHTML = contenidoHTML;

}

const productos = [
    {id:1 , nombre:"Pesadillas Nocturnas", precio:2000, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/cuadro%20negro.jpg", categoria:"cuadros"},
    {id:2 , nombre:"Desurbanismo", precio:2500, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/desurbanismo.jpg", categoria:"cuadros"},
    {id:3 , nombre:"Cielo y Tierra", precio:2500, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/entre%20el%20cielo%20y%20la%20tierra.jpg", categoria:"cuadros"},
    {id:4 , nombre:"Condor", precio:2000, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/mi%20condor.jpg", categoria:"cuadros"},
    {id:5 , nombre:"Todo lo que existe", precio:3000, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/todo%20lo%20que%20existe.jpg", categoria:"cuadros"},
    {id:6 , nombre:"Mi sol", precio:2000, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/mujer%20en%20ventada.jpg", categoria:"cuadros"},
    {id:7 , nombre:"Cenizas", precio:2500, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros/mujer%20y%20fuego.jpg", categoria:"cuadros"},
    {id:8 , nombre:"Parte del aire", precio:4000, cantidad:1, imagen:"https://lucasbernalb.github.io/PreEntrega.Bernal/img/productos/cuadros//parte%20del%20aire.jpg", categoria:"cuadros"},
]


function agregarProductos(id) {
    const carrito = cargarCarritoLocalS();
    const produ = productos.find(producto => producto.id == id)

    if (carrito.some(producto => producto.id == id)) {
        carrito.map(producto => {
            if (producto.id == id) {
                return { 
                    ...producto, cantidad: producto.cantidad++
                }
            }
            return producto
        })    
    }
    carrito.push(produ);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    }


function renderBotonCarrito() {
    let total = totalProductos();
    document.getElementById("totalCarrito").innerHTML = total;

}

function eliminarCarritoLS(id) {
    const carrito = cargarCarritoLocalS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    sumarProductosCarrito();
    descuentoProductosCarrito();
    console.log("El producto #" + id + " ha sido removido correctamente"); 
}

function totalProductos() {
    const carrito = cargarCarritoLocalS();

    return carrito.length;
}

function cargarCarritoLocalS() {
    return carrito = JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
    descuentoProductosCarrito();
    console.log("El carrito se ha vaciado correctamente"); 
}

function cargarProductoLS() {
    let id = JSON.parse(localStorage.getItem("producto"));
    const producto = productos.find(item => item.id == id);

    return producto;
}


function sumarProductosCarrito() {
        let precio = cargarCarritoLocalS();
        const productoPrecio = precio.map(item => item.precio);
        let productoPrecioF = 0;
        productoPrecioF = productoPrecio.reduce((acumulador, numero) => acumulador + numero, 0);
        console.log(productoPrecioF);
        document.getElementById("totalPagar").innerHTML = "$" + productoPrecioF;     
        return productoPrecioF;
}

function descuentoProductosCarrito() {
    let precioFinal = sumarProductosCarrito();
    let descuentoFinal = 0;
    let descuentoOff = 0;
    if(precioFinal <= 5000){
       descuentoFinal = precioFinal * (descuentoOff = 0.10);   
    } else if (precioFinal <= 10000){
         descuentoFinal = precioFinal * (descuentoOff = 0.12); 
    } else if (precioFinal <= 15000){
        descuentoFinal = precioFinal * (descuentoOff = 0.15); 
    } else if (precioFinal >= 20000){
        descuentoFinal = precioFinal * (descuentoOff = 0.18);   
    }
    document.getElementById("descuentoFinal").innerHTML = "-" + descuentoFinal;
    document.getElementById("precioFinal").innerHTML = "$" + (precioFinal - descuentoFinal);
    console.log(descuentoFinal);
}

function guardarProductoLS(id) {
    localStorage.setItem("producto", JSON.stringify(id));
}

function notificacionValidar() {
    let precioFinal = sumarProductosCarrito();
    if(precioFinal > 0){
        Swal.fire({
            title: "Su compra ha finalizado con éxito",
            text: "Gracias por comprar en Reina Artura!",
            icon: "success",
            timer: 3000,
            confirmButtonText: `OK`,
            allowOutsideClick: `<a href="/index.html" class="text-white text-decoration-none">OK</a>`
          }) 
        }else if(precioFinal == 0){
            Swal.fire({
                title: "No tiene ningun producto en el carrito",
                text: "Vuelve a la página principal para agregar productos.",
                icon: "error",
                timer: 3000,
                confirmButtonText: `OK`,
                allowOutsideClick: `<a href="/index.html" class="text-white text-decoration-none">OK</a>`
            })
        }
        
        redireccionOut()
      vaciarCarrito();
      descuentoProductosCarrito();
    }

function redireccionOut() {
    setTimeout(() => {
    redireccion(); 
}, 5000)
}

    function redireccion() {
        window.location.href = "index.html"
    }


    document.getElementById("btnSucces").addEventListener("click", notificacionValidar);


