const jugadores = [];
const miEquipo = JSON.parse(localStorage.getItem("miEquipo")) || []
const equipoRival = JSON.parse(localStorage.getItem("equipoRival")) || []
const teamPlayers = []

document.getElementById('cantidadJugadores').innerHTML = miEquipo.length;

document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;



const containerJugadores = document.querySelector('#contenedorJugadores');
const containerTeams = document.querySelector('#contenedorEquipos');
const containerMiEquipo = document.querySelector('#contenedorMiEquipo');
const containerEquipoRival = document.querySelector('#contenedorEquipoRival')

var botonDehabilitado = document.getElementsByClassName('botonJugadores')

let checkEquipoRival = equipoRival.length;
let cardsMiEquipo = containerMiEquipo.childElementCount;
let cardsEquipoRival = containerEquipoRival.childElementCount;

function creadorCards (array, container){
    array.forEach(datosEquipos =>{
        let card = document.createElement("div");
        card.className = 'cardEquipos';
        card.innerHTML = `<img src="${datosEquipos.logo}" class="imagenJugadores" id="${datosEquipos.teamName}" onclick="abrirEquipos(this.id)" >
        <p>${datosEquipos.teamName}</p>`
        container.appendChild(card)
    })
}

function creadorCardsJugadores (array, container){
    array.forEach(datosEquipos =>{
        let card = document.createElement("div");
        card.className = 'cardJugadores';
        card.innerHTML = `<img src="https://nba-players.herokuapp.com/players/${datosEquipos.lastName}/${datosEquipos.firstName}" class="imagenJugadores" onerror='this.style.display = "none"'>
        <p>${datosEquipos.firstName}</p>
        <p>${datosEquipos.lastName}</p>
        <button class="botonJugadores" id="${datosEquipos.firstName}%20${datosEquipos.lastName}" onclick="estadisticasDelJugador(this.id)">Agregar al equipo</button>`
        container.appendChild(card)
    })
}



fetch('teams.json')
    .then((res) => res.json())
    .then((equipos) => {
    creadorCards(equipos, containerTeams)})

function abrirEquipos (nombreEquipo) {
    fetch('players.json')
    .then((res) => res.json())
    .then((data) => {
        const jugadoresPorEquipo = data.filter (data => data.teamName === nombreEquipo)
        if(containerJugadores.hasChildNodes()) {
            containerJugadores.innerHTML = '';
            jugadoresPorEquipo.push(teamPlayers)
            creadorCardsJugadores (jugadoresPorEquipo, containerJugadores)
        }else{
            creadorCardsJugadores (jugadoresPorEquipo, containerJugadores)
        }
        console.log(jugadoresPorEquipo)})
}




function estadisticasDelJugador (nombreDelJugador){
    fetch(`https://www.balldontlie.io/api/v1/players?search=${nombreDelJugador}`)
    .then((res) => res.json())
    .then((data) => {
        const getId = data.data[0].id
        return fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${getId}`)})
    .then((res) => res.json())
    .then((estadisticas) => {
        console.log(estadisticas)
        if(miEquipo.length < 5){
            miEquipo.push(estadisticas.data[0])
            localStorage.setItem("miEquipo", JSON.stringify(miEquipo));
            document.getElementById('cantidadJugadores').innerHTML = miEquipo.length;
        }else if(equipoRival.length < 5){
            equipoRival.push(estadisticas.data[0])
            localStorage.setItem("equipoRival", JSON.stringify(equipoRival));
            document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;
        } else {
            botonDehabilitado.disabled = true;
        }
        checkEquipoRival = equipoRival.length
        console.log(miEquipo)
        console.log(miEquipo[0].ast)
    })
}


let total=0;

let puntosLocal=0;
let puntosVisita=0;
let puntosEmpate=0;

const popUp = document.getElementById('ventanaPopUp');
const modal = document.getElementById('modal')
const cerrar = document.getElementById('botonCerrado');
const botonPartida = document.getElementById('botonVS')

botonPartida.addEventListener ('click', abrirPopUp);



function abrirPopUp (){
    if (checkEquipoRival === 5 && cardsEquipoRival < 5 ){
    creadorCardsJugadores(miEquipo, containerMiEquipo);
    creadorCardsJugadores (equipoRival, containerEquipoRival);
    }
    cardsMiEquipo = containerMiEquipo.childElementCount;
    cardsEquipoRival = containerEquipoRival.childElementCount;
    if (cardsEquipoRival > 4){
        popUp.classList.add("mostrarPopUp");
        modal.classList.add("mostrarModal");
    }else{
        swal({
            title: "Los equipos no están completos",
            text: "Debes elegir cinco jugadores por lado",
            icon: "error",
            button: "Continuar",
        });
    }
}


cerrar.addEventListener('click', () => {
    popUp.classList.remove("mostrarPopUp");
    modal.classList.remove("mostrarModal");
});

function juego(rol){
    switch (rol) {
        case 0:
            miEquipo[rol].pts > equipoRival[rol].pts &&  puntosLocal++;    
            miEquipo[rol].pts < equipoRival[rol].pts &&  puntosVisita++;
            miEquipo[rol].pts === equipoRival[rol].pts &&  puntosEmpate++;
            break;
        case 1:
            miEquipo[rol].fg3m > equipoRival[rol].fg3m &&  puntosLocal++;    
            miEquipo[rol].fg3m < equipoRival[rol].fg3m &&  puntosVisita++;
            miEquipo[rol].fg3m === equipoRival[rol].fg3m &&  puntosEmpate++;
            break;
        case 2:
            miEquipo[rol].ast > equipoRival[rol].ast &&  puntosLocal++;    
            miEquipo[rol].ast < equipoRival[rol].ast &&  puntosVisita++;
            miEquipo[rol].ast === equipoRival[rol].ast &&  puntosEmpate++;
            break;
        case 3:
            miEquipo[rol].reb > equipoRival[rol].reb &&  puntosLocal++;    
            miEquipo[rol].reb < equipoRival[rol].reb &&  puntosVisita++;
            miEquipo[rol].reb === equipoRival[rol].reb &&  puntosEmpate++;
            break;
        case 4:
            miEquipo[rol].stl > equipoRival[rol].stl &&  puntosLocal++;    
            miEquipo[rol].stl < equipoRival[rol].stl &&  puntosVisita++;
            miEquipo[rol].stl === equipoRival[rol].stl &&  puntosEmpate++;
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

