let productos = [
    { id: 1, nombre: 'Camiseta Nike Mujer', marca: 'Nike', precio: 20000, imagen: 'imagenes/remeramujer.jpg', categoria: 'mujer', disponible: true },
    { id: 2, nombre: 'Pantalón Nike Mujer', marca: 'Nike', precio: 35000, imagen: 'imagenes/pantalonmujer.jpg', categoria: 'mujer', disponible: true },
    { id: 3, nombre: 'Chaqueta Nike Mujer', marca: 'Nike', precio: 60000, imagen: 'imagenes/camperamujer.jpg', categoria: 'mujer', disponible: true },
    { id: 4, nombre: 'Sudadera Nike Mujer', marca: 'Nike', precio: 55000, imagen: 'imagenes/buzomujer.jpg', categoria: 'mujer', disponible: true },
    { id: 5, nombre: 'Camiseta Nike Hombre', marca: 'Nike', precio: 20000, imagen: 'imagenes/remerahombre.jpg', categoria: 'hombre', disponible: true },
    { id: 6, nombre: 'Pantalón Nike Hombre', marca: 'Nike', precio: 40000, imagen: 'imagenes/pantalonhombre.jpg', categoria: 'hombre', disponible: true },
    { id: 7, nombre: 'Chaqueta Nike Hombre', marca: 'Nike', precio: 70000, imagen: 'imagenes/camperahombre.jpg', categoria: 'hombre', disponible: true },
    { id: 8, nombre: 'Sudadera Nike Hombre', marca: 'Nike', precio: 65000, imagen: 'imagenes/buzohombre.jpg', categoria: 'hombre', disponible: true },
    { id: 9, nombre: 'Camiseta Nike Niños', marca: 'Nike', precio: 15000, imagen: 'imagenes/remeraniños.jpg', categoria: 'ninos', disponible: true },
    { id: 10, nombre: 'Pantalón Nike Niños', marca: 'Nike', precio: 30000, imagen: 'imagenes/pantalonniños.jpg', categoria: 'ninos', disponible: true },
    { id: 11, nombre: 'Sudadera Nike Niños', marca: 'Nike', precio: 45000, imagen: 'imagenes/buzoniños.jpg', categoria: 'ninos', disponible: true },
    { id: 12, nombre: 'Zapatillas Nike Niños', marca: 'Nike', precio: 90000, imagen: 'imagenes/zapasniños.jpg', categoria: 'ninos', disponible: true },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(productId) {
    const producto = productos.find(item => item.id === productId);
    if (producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);
        
        if (!productoExistente) {
            carrito.push({ ...producto, cantidad: 1 });
        } else {
            productoExistente.cantidad += 1; 
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito(); 
        mostrarCarrito(); 
    }
}

function actualizarContenidoCarrito() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    contenidoCarrito.innerHTML = '';
    
    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }
    
    carrito.forEach(producto => {
        contenidoCarrito.innerHTML += `
            <div class="producto-carrito">
                <strong>Nombre:</strong> ${producto.nombre} <br>
                <strong>Precio:</strong> $${producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <br>
                <strong>Cantidad:</strong> ${producto.cantidad} <br>
                <hr>
            </div>
        `;
    });
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contadorCarrito');
    const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = totalCantidad; 
}

function mostrarProductos(categoria) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    
    let productosFiltrados = categoria === 'menu' ? productos : productos.filter(p => p.categoria === categoria);
    
    productosFiltrados.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <strong>${producto.nombre}</strong> - $${producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <button onclick='agregarAlCarrito(${producto.id})'>Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

function mostrarMetodoPago() {
    document.getElementById('metodoPago').style.display = 'block';
    document.getElementById('productos').innerHTML = '';
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.style.display = 'block'; 
    actualizarContenidoCarrito(); 
}

document.getElementById('buscarBtn').addEventListener('click', () => {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    resultados.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <strong>${producto.nombre}</strong> - $${producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <button onclick='agregarAlCarrito(${producto.id})'>Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
});

document.getElementById('confirmarPagoBtn').addEventListener('click', () => {
    const metodoSeleccionado = document.getElementById('metodoPagoSelect').value;
    alert(`Pago confirmado con el método: ${metodoSeleccionado}`);
});

mostrarProductos('menu');