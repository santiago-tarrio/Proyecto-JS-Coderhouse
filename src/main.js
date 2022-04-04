const jugadores = [];
const miEquipo = JSON.parse(localStorage.getItem("miEquipo")) || []
const equipoRival = JSON.parse(localStorage.getItem("equipoRival")) || []

document.getElementById('cantidadJugadores').innerHTML = miEquipo.length;

document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;

class Jugador{
    constructor (id, nombre, equipo, puntos, tirosDe3, asistencias, rebotes, robos, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.equipo = equipo;
        this.puntos = puntos;
        this.tirosDe3= tirosDe3;
        this.asistencias = asistencias;
        this.rebotes = rebotes;
        this.robos = robos;
        this.imagen = imagen;
    }
}


var jugadoresArray = (new Jugador(0, "LeBron James", "Los Angeles Lakers", 25.0, 365, 7.8, 7.7, 1.1, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png"));
jugadores.push(jugadoresArray)

var jugadoresArray = (new Jugador(1, "Stephen Curry", "Golden State Warriors", 32.0, 421, 5.8, 5.5, 1.2, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201939.png"));
jugadores.push(jugadoresArray)

var jugadoresArray = (new Jugador(2, "Nikola Jokic", "Denver Nuggets", 26.4, 388, 8.3, 10.8, 1.3, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203999.png"));
jugadores.push(jugadoresArray)

var jugadoresArray = (new Jugador(3, "Luka Doncic", "Dallas Mavericks", 27.7, 350, 8.6, 8.0, 1.0, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629029.png"));
jugadores.push(jugadoresArray)

var jugadoresArray = (new Jugador(4, "Giannis Antetokounmpo", "Milwaukee Bucks", 28.1, 303, 5.9, 11.0, 1.2, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png"));
jugadores.push(jugadoresArray)

var jugadoresArray = (new Jugador(5, "Rudy Gobert", "Utah Jazz", 14.3, 000, 1.3, 13.5, 1.6, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203497.png"));
jugadores.push(jugadoresArray)

var jugadoresArray = (new Jugador(6, "Chris Paul", "Phoenix Suns", 16.4, 395, 8.9, 4.5, 1.4, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/101108.png"));
jugadores.push(jugadoresArray)



const containerJugadores = document.querySelector('#contenedorJugadores');
const containerMiEquipo = document.querySelector('#contenedorMiEquipo');
const containerEquipoRival = document.querySelector('#contenedorEquipoRival')

var botonDehabilitado = document.getElementsByClassName('botonJugadores')

function creadorCards (array, container){
    array.forEach(datosJugadores =>{
        let card = document.createElement("div");
        card.className = 'cardJugadores';
    
        card.innerHTML = `<img src="${datosJugadores.imagen}" class="imagenJugadores" >
        <p>${datosJugadores.nombre}</p>
        <p>${datosJugadores.equipo}</p>
        <button class="botonJugadores" onclick="agregarJugador(${datosJugadores.id})">Agregar al equipo</button>`
        container.appendChild(card)
    })
    
}

/*
function creadorEquipos (array, id, container){
    let card = document.createElement("div");
        card.className = 'cardJugadores';
    
        card.innerHTML = `<p>NBA</p>
        <img src="${array[id].imagen}" class="imagenJugadores" >
        <p>${array[id].nombre}</p>
        <p>${array[id].equipo}</p>`
        container.appendChild(card)
}

*/

creadorCards (jugadores, containerJugadores);

const agregarJugador = (jugadorElegido) =>{
    const nuevoJugador = jugadores.find (jugadores => jugadores.id === jugadorElegido)
    if(miEquipo.length < 5){
        miEquipo.push(nuevoJugador)
        localStorage.setItem("miEquipo", JSON.stringify(miEquipo));
        document.getElementById('cantidadJugadores').innerHTML = miEquipo.length;
        //creadorEquipos (miEquipo, nuevoJugador.id, containerMiEquipo);
    }else if(equipoRival.length < 5){
        equipoRival.push(nuevoJugador)
        localStorage.setItem("equipoRival", JSON.stringify(equipoRival));
        document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;
        //creadorEquipos (equipoRival, nuevoJugador.id, containerEquipoRival);
    } else {
        botonDehabilitado.disabled = true;
    }
}

console.log(miEquipo);
console.log(equipoRival);

let total=0;

let puntosLocal=0;
let puntosVisita=0;
let puntosEmpate=0;

const popUp = document.getElementById('ventanaPopUp');
const cerrar = document.getElementById('botonCerrado');


function abrirPopUp (){
    popUp.classList.add("mostrarPopUp");
    creadorCards (miEquipo, containerMiEquipo);
    creadorCards (equipoRival, containerEquipoRival);
    console.log(miEquipo);
}

cerrar.addEventListener('click', () => {
    popUp.classList.remove("mostrarPopUp");
});

function juego(rol){
    switch (rol) {
        case 0:
            miEquipo[rol].puntos > equipoRival[rol].puntos &&  puntosLocal++;    
            miEquipo[rol].puntos < equipoRival[rol].puntos &&  puntosVisita++;
            miEquipo[rol].puntos === equipoRival[rol].puntos &&  puntosEmpate++;
            break;
        case 1:
            miEquipo[rol].tirosDe3 > equipoRival[rol].tirosDe3 &&  puntosLocal++;    
            miEquipo[rol].tirosDe3 < equipoRival[rol].tirosDe3 &&  puntosVisita++;
            miEquipo[rol].tirosDe3 === equipoRival[rol].tirosDe3 &&  puntosEmpate++;
            break;
        case 2:
            miEquipo[rol].asistencias > equipoRival[rol].asistencias &&  puntosLocal++;    
            miEquipo[rol].asistencias < equipoRival[rol].asistencias &&  puntosVisita++;
            miEquipo[rol].asistencias === equipoRival[rol].asistencias &&  puntosEmpate++;
            break;
        case 3:
            miEquipo[rol].rebotes > equipoRival[rol].rebotes &&  puntosLocal++;    
            miEquipo[rol].rebotes < equipoRival[rol].rebotes &&  puntosVisita++;
            miEquipo[rol].rebotes === equipoRival[rol].rebotes &&  puntosEmpate++;
            break;
        case 4:
            miEquipo[rol].robos > equipoRival[rol].robos &&  puntosLocal++;    
            miEquipo[rol].robos < equipoRival[rol].robos &&  puntosVisita++;
            miEquipo[rol].robos === equipoRival[rol].robos &&  puntosEmpate++;
        default:
            console.log("error")
    }
}


function enfrentamiento() {
    for(let i = 0; i < 5; i++){
        juego(i);
    }
}

const empezarPartida = document.getElementById('botonPartida');

const resultado = document.getElementById('resultado');

empezarPartida.addEventListener('click', () => {
    enfrentamiento();
    console.log(puntosEmpate);
    console.log(puntosLocal);
    console.log(puntosVisita);
    if (puntosLocal > puntosVisita) {
        resultado.innerHTML = `<p>Ganó el equipo local</p>`
        localStorage.clear();
        } else if (puntosLocal < puntosVisita) {
        resultado.innerHTML = `<p>Ganó el equipo visitante</p>`
        localStorage.clear();
        } else {
        resultado.innerHTML = `<p>Es un empate</p>`
        localStorage.clear();
    }
});

if (puntosLocal > puntosVisita) {
    console.log("Ganan los locales");
    } else if (puntosLocal < puntosVisita) {
    console.log("Ganan los visitantes");
    } else {
    console.log("Empate");
}

