

let montoCompra = 150 
let descuento = 0
if(montoCompra > 100){
    descuento= montoCompra * 0.1

}
console.log("Monto de la compra: $" + montoCompra)
console.log("Descuento aplicado: $" + descuento)

let cantidadIteraciones = 5
for (let i=1; i <= cantidadIteraciones; i++)
    console.log( "Iteracion numero: " + i)
console.log("Ciclo finalizado")


function calcularPrecioFinal(precio, descuento){
    let descuentoDecimal = descuento/
    100;
    let montoDescuento = precio * descuentoDecimal;
    let precioFinal = precio -
    montoDescuento;
    return precioFinal.toFixed(2);

}
 
    let precioProducto =
    parseFloat(prompt("Ingrese precio del producto"))
    let porcentajeDescuento =
    parseFloat(prompt("Ingrese porcentaje de descuento"))
  
    let precioFinal =
    calcularPrecioFinal(precioProducto,
    porcentajeDescuento);
   
    console.log(`El precio final después
        del descuento es: $${precioFinal}`);
       alert(precioFinal)

       const producto = {
        nombre: 'Camiseta',
        marca: 'Nike',
        precio: 29.99,
        disponible: true
      };
      console.log(producto.nombre); 
console.log(producto.marca); 

const productos = ['Camiseta', 'Pantalón', 'Vestido', 'Zapatos'];
console.log(productos[0]); 
console.log(productos[1]); 
productos.push('Calcetines');
productos.splice(2, 1); 

const posicion = productos.indexOf('Vestido');
console.log(posicion); 
const productosFiltrados = productos.filter(producto => producto.includes('Ca'));
console.log(productosFiltrados); 

function agregarAlCarrito(producto) {
    
    const productoExistente = carrito.find((item) => item.id === producto.id);
  
   
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
     
      carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
  }
  
  const indumentaria = {
    nombre: 'Camiseta',
    marca: 'Nike',
    precio: 29.99,
    disponible: true
  };
  console.log(indumentaria.nombre);
console.log(indumentaria.marca);

