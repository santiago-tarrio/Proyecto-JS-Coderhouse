class Producto{
    constructor (nombre, precio, stock, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock= stock;
        this.imagen = imagen; 
    }
}

const productos = [];

var productoArray = (new Producto("Jersey Los Angeles Lakers", 25000, 2, "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/019acd9b-fd80-4ddd-902d-4b96e28a0671/jersey-nba-swingman-lebron-james-lakers-GTRSXs.png" ));
productos.push(productoArray)
var productoArray = (new Producto("Jersey Phoenix Suns", 25000, 5, "https://images.footballfanatics.com/phoenix-suns/phoenix-suns-nike-city-edition-swingman-jersey-deandre-ayton-youth_ss4_p-12052266+pv-1+u-om8nwncrzqzfs88oclzs+v-cc9c17bb9dad423ebc15d0589c013c29.jpg?_hv=1&w=600"));
productos.push(productoArray)
var productoArray = (new Producto("Jersey Denver Nuggets", 25000, 3, "https://images.footballfanatics.com/denver-nuggets/denver-nuggets-nike-icon-edition-swingman-jersey-navy-nikola-jokic-mens_ss4_p-11972902+pv-1+u-ccro0a8kd92fbgch8thg+v-c2e238a3f7b546a98b1ea6b7340bbeb2.jpg?_hv=1&w=900"));
productos.push(productoArray)
var productoArray = (new Producto("Gorra Brooklyn Nets", 12000, 6, "https://images.footballfanatics.com/brooklyn-nets/brooklyn-nets-new-era-the-league-9forty-adjustable-cap_ss4_p-11896022+u-8wh4xk1s2wecqry69zs0+v-c47f1b8820f6417aa1174661542cc83f.jpg?_hv=1&w=600"));
productos.push(productoArray)
var productoArray = (new Producto("Short Boston Celtics", 16000, 10, "https://images.footballfanatics.com/boston-celtics/boston-celtics-nike-icon-swingman-shorts-mens_ss4_p-11914513+u-yxdp39thg5asfcni9drm+v-bfea50cedef04222a2ff57cf9195235f.jpg?_hv=1&w=600"));
productos.push(productoArray)
var productoArray = (new Producto("Pantalon Los Angeles Clippers", 20000, 1));
productos.push(productoArray)
var productoArray = (new Producto("Pantalon Minnesota Timberwolves", 20000, 0));
productos.push(productoArray)

const carrito = []

let total=0;

const indiceArray = productos.map(e => e.stock).indexOf(0);
productos.splice(indiceArray, 1);


function aplicarDescuento(parametro){
    if(parametro<1300){
        parametro= (parametro*1.20)/12;
    }
    return parametro;
}

let hayStock;

do{
    const arrayPrompt = [];
    for (let i = 0; i < productos.length; i++){
        paraPrompt = `${i}. ${productos[i].nombre} a $ ${productos[i].precio}`;
        arrayPrompt.push(paraPrompt);
    }
    const seleccionDeProducto = prompt(`Seleccione un producto para agregar al carrito:
    ${arrayPrompt.join ("\r")}`);
    
    const seleccionDeStock = prompt ("Seleccione la cantidad que desea comprar de este producto:");

    switch (seleccionDeProducto) {
        case "1":
            disponibilidadStock = productos[0].stock
            break;
        case "2":
            disponibilidadStock = productos[1].stock
            break;
        case "3":
            disponibilidadStock = productos[2].stock
            break;
        case "4":
            disponibilidadStock = productos[3].stock
            break;
        case "5":
            disponibilidadStock = productos[4].stock
            break;
        case "6":
            disponibilidadStock = productos[5].stock
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
                alert (`agregaste ${productos[0].nombre}`)
                total+=(productos[0].precio*seleccionDeStock);
                carrito.push(productos[0])
                break;
            case "1n":
                alert ("no hay stock")
                break;
            case "2s":
                alert (`agregaste ${productos[1].nombre}`)
                total+=productos[1].precio*seleccionDeStock;
                carrito.push(productos[1])
                break;
            case "2n":
                alert ("no hay stock")
                break;
            case "3s":
                alert (`agregaste ${productos[2].nombre}`)
                total+=(productos[2].precio*seleccionDeStock);
                carrito.push(productos[2])
                break;
            case "3n":
                alert ("no hay stock")
                break;
            case "4s":
                alert (`agregaste ${productos[3].nombre}`)
                total+=productos[3].precio*seleccionDeStock;
                carrito.push(productos[3])
                break;
            case "4n":
                alert ("no hay stock")
                break;
            case "5s":
                alert (`agregaste ${productos[4].nombre}`)
                total+=(productos[4].precio*seleccionDeStock);
                carrito.push(productos[4])
                break;
            case "5n":
                alert ("no hay stock")
                break;
            case "6s":
                alert (`agregaste ${productos[5].nombre}`)
                total+=productos[5].precio*seleccionDeStock;
                carrito.push(productos[5])
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


generarCards(productos);

function generarCards(bloqueDeProductos){
    let productosEnVenta = ``;
    bloqueDeProductos.forEach((datosArray) => {
        productosEnVenta += `<div class="producto">
        <p>NBA</p>
        <img src="${datosArray.imagen}" class="imagenProducto"  onError="eliminarImagen(this);">
        <p>${datosArray.nombre}</p>
        <p>${datosArray.precio}</p>
    </div>`;
    });
    inclusionDeProductos(productosEnVenta);
}


function inclusionDeProductos(cards) {
    document.getElementById("contenedorProductos").innerHTML = cards;
};

function eliminarImagen(element) {
    element.parentNode.remove();
}





