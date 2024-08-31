let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos = []; // Inicializamos una variable para almacenar productos en el ámbito global

async function cargarProductos() {
    try {
        const response = await axios.get('productos.json'); // Asegúrate de que la ruta sea correcta.
        productos = response.data; // Guardamos los productos globalmente
        return productos; // Retornamos los productos
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        return [];
    }
}

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
        mostrarContenidoCarrito(); 
    }
}

function eliminarDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarContenidoCarrito(); // Actualizar el contenido del carrito
}

function mostrarContenidoCarrito() {
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
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
                <hr>
            </div>
        `;
    });

    // Asignar eventos de clic a los botones de eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar-btn');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const id = parseInt(event.target.getAttribute('data-id'));
            eliminarDelCarrito(id); // Llama a la función con el ID del producto
        });
    });
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contadorCarrito');
    const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = totalCantidad; 
}

function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <strong>${producto.nombre}</strong> - $${producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <button class="agregar-btn" data-id="${producto.id}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
    
    // Asignar eventos de clic a los botones "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll('.agregar-btn');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const id = parseInt(event.target.getAttribute('data-id'));
            agregarAlCarrito(id);  // Llama a la función con el ID del producto
        });
    });
}

function mostrarMetodoPago() {
    document.getElementById('metodoPago').style.display = 'block';
    document.getElementById('productos').innerHTML = '';
}

function mostrarCarrito() {
    const carritoModal = document.getElementById('carritoModal');
    carritoModal.style.display = 'block'; 
    mostrarContenidoCarrito(); 
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('carritoModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('carritoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('menuBtn').addEventListener('click', async () => {
    const productos = await cargarProductos();
    mostrarProductos(productos);
});

document.getElementById('mujerBtn').addEventListener('click', async () => {
    const productos = await cargarProductos();
    mostrarProductos(productos.filter(p => p.categoria === 'mujer'));
});

document.getElementById('hombreBtn').addEventListener('click', async () => {
    const productos = await cargarProductos();
    mostrarProductos(productos.filter(p => p.categoria === 'hombre'));
});

document.getElementById('ninosBtn').addEventListener('click', async () => {
    const productos = await cargarProductos();
    mostrarProductos(productos.filter(p => p.categoria === 'ninos'));
});

document.getElementById('pagarBtn').addEventListener('click', mostrarMetodoPago);
document.getElementById('mostrarCarritoBtn').addEventListener('click', mostrarCarrito);
document.getElementById('buscarBtn').addEventListener('click', async () => {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const productos = await cargarProductos();
    const resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
    mostrarProductos(resultados);
});

document.getElementById('confirmarPagoBtn').addEventListener('click', () => {
    const metodoSeleccionado = document.getElementById('metodoPagoSelect').value;
    alert(`Pago confirmado con el método: ${metodoSeleccionado}`);
});

// Cargar productos al inicio
document.addEventListener('DOMContentLoaded', async () => {
    const productos = await cargarProductos();
    mostrarProductos(productos);
});