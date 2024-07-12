

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
       prompt(precioFinal)

