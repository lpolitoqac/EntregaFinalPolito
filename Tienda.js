
fetch("./data.json")
//fetch('./data.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            const li = document.createElement('li')
            li.innerHTML = `
                <h4>${productos.nombre}</h4>
                <p>$${productos.precio}</p>
                <p>Código: ${producto.id}</p>
                <hr/>
            `

            document.body.append(li)
        })
    })



const productos = [
    { id: 1, nombre: 'Filamento Helbot 1kg Color Negro ', precio: 3620 },
    { id: 2, nombre: 'Filamento Grilom 1kg Color Blanco', precio: 2570 },
    { id: 3, nombre: 'Filamento PLA Generico Color Negro 1kg', precio: 2000 },
    { id: 4, nombre: 'Filamento Helbot 1/2Kg Color Negro', precio: 1900},
    { id: 5, nombre: 'Filamento Helbot 1/2Kg Color Blanco', precio: 1900},
    { id: 6, nombre: 'Filamento Helbot 1/2Kg Color Rojo', precio: 1900},
    
]
let carrito = []

function mostrarListadoProductos() {
    for (const producto of productos) {
        let { nombre, precio, id } = producto
        let cardProducto = document.createElement('div')
        cardProducto.innerHTML = `
            <h3>${nombre}</h3>
            <h3>$ ${precio}</h3>
            <button class="button" id=${id} >Agregar al carrito</button>
        `
        cardProducto.className = 'card'
        let lista = document.getElementById('productosflex')
        lista.append(cardProducto)
        let botonParaAgregar = document.getElementById(`${producto.id}`)
        botonParaAgregar.addEventListener('click', agregarAlCarrito)
    }
}

function agregarAlCarrito(e) {
   
    let id = Number(e.target.getAttribute('id'));
    let productoAAgregar = productos.find((producto) => producto.id === id);
    let { nombre, precio } = productoAAgregar
    Toastify({

        text: `${productoAAgregar.nombre} se ha agregado al carrito OK`,
        className: 'toast',
        duration: 1500,
        
        }).showToast();
    existeEnCarrito(productoAAgregar)
        ? (() => {
            let productoEnCarrito = carrito.find(
                (producto) => producto.id === productoAAgregar.id
            );
            let indiceDelProducto = carrito.indexOf(productoEnCarrito);
            carrito[indiceDelProducto].cantidad += 1;
            let { cantidad } = carrito[indiceDelProducto]
            let productoAnterior = document.getElementById(
                `producto${productoAAgregar.id}`
            );
            productoAnterior.innerHTML = `
              <h3>${nombre}</h3>
              <h3>$ ${precio}</h3>
              <h3>Cantidad: ${cantidad}</h3>
              <h3>Total de ${nombre} : $ ${carrito[indiceDelProducto].cantidad * productoAAgregar.precio
                }</h3>
          `;
        })()
        : (() => {
            let productoConCantidad = { ...productoAAgregar, cantidad: 1 };
            let { nombre, precio } = productoConCantidad // Agregado hoy
            carrito.push(productoConCantidad);
            let cardCarrito = document.createElement('div');
            cardCarrito.innerHTML = `
              <p>${nombre}</p>
              <p>$ ${precio}</p>
              <p>Cantidad: 1</p>
          `;
            cardCarrito.setAttribute('id', `producto${productoConCantidad.id}`);
            cardCarrito.className = 'cardCarrito'
            let carritoContendor = document.getElementById('carrito');
            carritoContendor.append(cardCarrito);
        })();


}

function existeEnCarrito(productoAChequear) {
    
    return (carrito.some((producto) => producto.id === productoAChequear.id))
   
}

function finalizarCompra() {
    let finalizar = document.getElementById('finalizar-compra')
    finalizar.addEventListener('click', mostrarCompra)
}
function mostrarCompra() {
    Swal.fire({
        title: 'Está seguro de finalizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, quiero agregar algo más'
    }).then((result) => {
        if (result.isConfirmed) {
            let sumaTotal = 0
            for (producto of carrito) {
                sumaTotal += producto.precio * producto.cantidad
            }
            Swal.fire(`Su total de la compra es de $${sumaTotal}`)
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No finalizo su compra, puede seguir agregando productos al carrito',
                showConfirmButton: false,
                timer: 1000
            })
        }
    })
}
function vaciarCarrito() {
    let vaciar = document.getElementById('vaciar-carrito')
    vaciar.addEventListener('click', handleVaciarCarrito)
}
function handleVaciarCarrito() {
    Swal.fire({
        title: 'Vaciar Carrito de Compras?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO, Quiero seguir con las ofertas'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = []
            let carritoContendor = document.getElementById('carrito');
            carritoContendor.innerHTML = `<h2>Carrito de Compras</h2>
            <h3>Carrito Vacio aproveche nuestras ofertas!!!</h3>`
            Swal.fire({
                title: 'Carrito Vaciado OK!',
                icon: 'success'
            })
        }
    })

}
mostrarListadoProductos();
finalizarCompra();
vaciarCarrito()