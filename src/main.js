function Producto(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock= stock;
}

const producto1 = new Producto("Jersey Los Angeles Lakers", 25000, 2);
const producto2 = new Producto("Jersey Phoenix Suns", 25000, 5);
const producto3 = new Producto("Jersey Denver Nuggets", 25000, 3);
const producto4 = new Producto("Gorra Brooklyn Nets", 12000, 6);
const producto5 = new Producto("Short Boston Celtics", 16000, 10);
const producto6 = new Producto("Pantalon Los Angeles Clippers", 20000, 1);

let total=0;

function aplicarDescuento(parametro){
    if(parametro<1300){
        parametro= (parametro*1.20)/12;
    }
    return parametro;
}

let hayStock;

do{
    const seleccionDeProducto = prompt (`
        Seleccione un producto para agregar al carrito:
        1. ${producto1.nombre} a $ ${producto1.precio} 
        2. ${producto2.nombre} a $ ${producto2.precio} 
        3. ${producto3.nombre} a $ ${producto3.precio} 
        4. ${producto4.nombre} a $ ${producto4.precio}
        5. ${producto5.nombre} a $ ${producto5.precio}
        6. ${producto6.nombre} a $ ${producto6.precio}`);
    
    const seleccionDeStock = prompt ("Seleccione la cantidad que desea comprar de este producto:");

    switch (seleccionDeProducto) {
        case "1":
            disponibilidadStock = producto1.stock
            break;
        case "2":
            disponibilidadStock = producto2.stock
            break;
        case "3":
            disponibilidadStock = producto3.stock
            break;
        case "4":
            disponibilidadStock = producto4.stock
            break;
        case "5":
            disponibilidadStock = producto5.stock
            break;
        case "6":
            disponibilidadStock = producto6.stock
            break;
        default:
            alert ("NO ES VALIDO");
            break;
    }

    if(disponibilidadStock < seleccionDeStock){
        hayStock = "n";
    }else{
        hayStock = "s";
    }


    let stockProducto = seleccionDeProducto + hayStock; 
        console.log (stockProducto);
        switch (stockProducto) {
            case "1s":
                alert (`agregaste ${producto1.nombre}`)
                total+=(producto1.precio*seleccionDeStock);
                break;
            case "1n":
                alert ("no hay stock")
                break;
            case "2s":
                alert (`agregaste ${producto2.nombre}`)
                total+=producto2.precio*seleccionDeStock;
                break;
            case "2n":
                alert ("no hay stock")
                break;
            case "3s":
                alert (`agregaste ${producto3.nombre}`)
                total+=(producto3.precio*seleccionDeStock);
                break;
            case "3n":
                alert ("no hay stock")
                break;
            case "4s":
                alert (`agregaste ${producto4.nombre}`)
                total+=producto4.precio*seleccionDeStock;
                break;
            case "4n":
                alert ("no hay stock")
                break;
            case "5s":
                alert (`agregaste ${producto5.nombre}`)
                total+=(producto5.precio*seleccionDeStock);
                break;
            case "5n":
                alert ("no hay stock")
                break;
            case "6s":
                alert (`agregaste ${producto6.nombre}`)
                total+=producto6.precio*seleccionDeStock;
                break;
            case "6n":
                alert ("no hay stock")
                break;
            default:
                alert ("NO ES VALIDO");
                break;
        }    
        comprar=prompt ("seguir comprando s/n")
    
    }while(comprar!=="n")
        let descuentoConInteres=aplicarDescuento(total)
        if(total>1300){
            alert ("el total es " + total + " o en 12 cuotas sin interés de " + total/12);
        }else{
            alert ("el total es " + total + " o en 12 cuotas de " + descuentoConInteres)
        }
