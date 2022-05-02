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
const loader = document.getElementsByClassName('containerSpinner')
var botonDehabilitado = document.getElementsByClassName('botonJugadores')

let checkEquipoRival = equipoRival.length;
let cardsMiEquipo = containerMiEquipo.childElementCount;
let cardsEquipoRival = containerEquipoRival.childElementCount;

function creadorCards (array, container){
    array.forEach(datosEquipos =>{
        let card = document.createElement("div");
        card.className = 'cardEquipos';
        card.innerHTML = `<img src="${datosEquipos.logo}" id="${datosEquipos.teamName}" onclick="abrirEquipos(this.id)" >
        <p>${datosEquipos.teamName}</p>`
        container.appendChild(card)
    })
}

function creadorCardsJugadores (array, container){
    array.forEach(datosEquipos =>{
        if (datosEquipos.firstName !== undefined){
        let card = document.createElement("div");
        card.className = 'cardJugadores';
        card.innerHTML = `<div class="containerImgPlayer"><img src="https://nba-players.herokuapp.com/players/${datosEquipos.lastName}/${datosEquipos.firstName}" class="imagenJugadores"></div>
        <p id="nombreP">${datosEquipos.firstName}</p>
        <p>${datosEquipos.lastName}</p>
        <button class="botonJugadores buttonVS" id="${datosEquipos.firstName}%20${datosEquipos.lastName}" onclick="estadisticasDelJugador(this.id)">Agregar al equipo</button>`
        container.appendChild(card)
    }
    })
}

function creadorCardsEquipos (array, container){
    array.forEach(datosEquipos =>{
        let card = document.createElement("div");
        card.className = 'cardJugadores';
        card.innerHTML = `<img src="https://nba-players.herokuapp.com/players/${datosEquipos.apellido}/${datosEquipos.nombre}" class="imagenJugadores">
        <p id="nombreP">${datosEquipos.nombre}</p>
        <p>${datosEquipos.apellido}</p>`
        container.appendChild(card)
    })
}


reemplazarImagen = (e) => {
    padreImagen = e.target.parentNode
    abueloImagen = padreImagen.parentNode
    nombreImagen = abueloImagen.children[1].innerHTML
    apellidoImagen = abueloImagen.children[2].innerHTML

    fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=${nombreImagen} ${apellidoImagen}`,
        {
        method: "GET"
        }
    )
    .then((res) => res.json())
    .then((data) => {
        e.target.src = data.query.pages[0].thumbnail.source;
        e.target.className += ' imagenAlternativa';
    })
    .catch(error => {
        e.target.src = `https://graffica.info/wp-content/uploads/2017/08/NBA-logo-png-download-free-1200x675.png`
        e.target.className += ' imagenError'
    });
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
        document.getElementById('controlSpinner').style.display = 'inline-block'
        containerJugadores.style.display = 'none'
        if(containerJugadores.hasChildNodes()) {
            containerJugadores.innerHTML = '';
            jugadoresPorEquipo.push(teamPlayers)
            creadorCardsJugadores (jugadoresPorEquipo, containerJugadores)
        }else{
            creadorCardsJugadores (jugadoresPorEquipo, containerJugadores)
        }
        console.log(jugadoresPorEquipo)
        imagenesHtml = document.getElementsByClassName("imagenJugadores")

        Array.from(imagenesHtml).forEach(e => {
            e.addEventListener('error', reemplazarImagen)});
        console.log(jugadoresPorEquipo)
        var undefinedName = document.getElementById('nombreP').innerHTML
        console.log(undefinedName)
    })
    setTimeout (carga, 3000)
    function carga (){
        document.getElementById('controlSpinner').style.display = 'none'
        containerJugadores.style.display = 'flex';
    }
    
}



function estadisticasDelJugador (nombreDelJugador){
    fetch(`https://www.balldontlie.io/api/v1/players?search=${nombreDelJugador}`)
    .then((res) => res.json())
    .then((data) => {
        const getId = data.data[0].id
        return fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${getId}`)})
    .then((res) => res.json())
    .then((estadisticas) => {
        if (estadisticas.data[0] === undefined || estadisticas.data[0] === null){
            swal({
                title: "No se encontraron estadísticas para este jugador",
                text: "Por favor elija otro",
                icon: "error",
                button: "Continuar",
            });
        }
        const jugadorId = estadisticas.data[0].player_id
        console.log(jugadorId)
        let jugadorRepetidoMiEquipo = miEquipo.some(miEquipo => miEquipo.player_id === estadisticas.data[0].player_id)
        let jugadorRepetidoEquipoRival = equipoRival.some(equipoRival => equipoRival.player_id === estadisticas.data[0].player_id)
        if(jugadorRepetidoMiEquipo === true || jugadorRepetidoEquipoRival === true){
            swal({
                title: "Este jugador ya ha sido elegido en algún equipo",
                text: "Debes elegir otro jugador",
                icon: "error",
                button: "Continuar",
            });
        }
        if(miEquipo.length < 5 && jugadorRepetidoMiEquipo === false && jugadorRepetidoEquipoRival === false && estadisticas.data[0] !== undefined){
            miEquipo.push(estadisticas.data[0])
            localStorage.setItem("miEquipo", JSON.stringify(miEquipo));
            document.getElementById('cantidadJugadores').innerHTML = miEquipo.length;
            console.log(estadisticas.data[0])
        }else if(equipoRival.length < 5 && jugadorRepetidoMiEquipo === false && jugadorRepetidoEquipoRival === false && estadisticas.data[0] !== undefined){
            equipoRival.push(estadisticas.data[0])
            localStorage.setItem("equipoRival", JSON.stringify(equipoRival));
            document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;
        } else {
            botonDehabilitado.disabled = true;
        }
        checkEquipoRival = equipoRival.length
        console.log(miEquipo)
        console.log(miEquipo[0].ast)
        console.log(estadisticas.data[0].player_id)
        return fetch(`https://www.balldontlie.io/api/v1/players/${estadisticas.data[0].player_id}`)})
    .then((res) => res.json())
    .then((names) => {
        if(miEquipo.length < 6 && equipoRival.length === 0){
        const combinarNombre = miEquipo.find (miEquipo => miEquipo.player_id === names.id)
        combinarNombre.nombre = `${names.first_name}`;
        combinarNombre.apellido = `${names.last_name}`;
        }else{
        const combinarNombreRival = equipoRival.find (equipoRival => equipoRival.player_id === names.id)
        combinarNombreRival.nombre = `${names.first_name}`;
        combinarNombreRival.apellido = `${names.last_name}`;
        console.log(miEquipo)
        console.log(equipoRival)}
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
    console.log(checkEquipoRival)
    if (checkEquipoRival === 5 && cardsEquipoRival < 5 ){
    creadorCardsEquipos(miEquipo, containerMiEquipo);
    creadorCardsEquipos(equipoRival, containerEquipoRival);
    imagenesHtml = document.getElementsByClassName("imagenJugadores")
    Array.from(imagenesHtml).forEach(e => {
        e.addEventListener('error', reemplazarImagen)});
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
    console.log(checkEquipoRival)
    console.log(cardsEquipoRival)
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
            miEquipo[rol].pts > (equipoRival[rol].pts * 2) &&  puntosLocal++;
            (miEquipo[rol].pts * 2) < equipoRival[rol].pts &&  puntosVisita++;
            break;
        case 1:
            miEquipo[rol].fg3m > equipoRival[rol].fg3m &&  puntosLocal++;    
            miEquipo[rol].fg3m < equipoRival[rol].fg3m &&  puntosVisita++;
            miEquipo[rol].fg3m === equipoRival[rol].fg3m &&  puntosEmpate++;
            miEquipo[rol].fg3m > (equipoRival[rol].fg3m * 2) &&  puntosLocal++;
            (miEquipo[rol].fg3m * 2) < equipoRival[rol].fg3m &&  puntosVisita++;
            break;
        case 2:
            miEquipo[rol].ast > equipoRival[rol].ast &&  puntosLocal++;    
            miEquipo[rol].ast < equipoRival[rol].ast &&  puntosVisita++;
            miEquipo[rol].ast === equipoRival[rol].ast &&  puntosEmpate++;
            miEquipo[rol].ast > (equipoRival[rol].ast * 2) &&  puntosLocal++;
            (miEquipo[rol].ast * 2) < equipoRival[rol].ast &&  puntosVisita++;
            break;
        case 3:
            miEquipo[rol].reb > equipoRival[rol].reb &&  puntosLocal++;    
            miEquipo[rol].reb < equipoRival[rol].reb &&  puntosVisita++;
            miEquipo[rol].reb === equipoRival[rol].reb &&  puntosEmpate++;
            miEquipo[rol].reb > (equipoRival[rol].reb * 2) &&  puntosLocal++;
            (miEquipo[rol].reb * 2) < equipoRival[rol].reb &&  puntosVisita++;
            break;
        case 4:
            miEquipo[rol].stl > equipoRival[rol].stl &&  puntosLocal++;    
            miEquipo[rol].stl < equipoRival[rol].stl &&  puntosVisita++;
            miEquipo[rol].stl === equipoRival[rol].stl &&  puntosEmpate++;
            miEquipo[rol].stl > (equipoRival[rol].stl * 2) &&  puntosLocal++;
            (miEquipo[rol].stl * 2) < equipoRival[rol].stl &&  puntosVisita++;
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


empezarPartida.addEventListener('click', () => {
    enfrentamiento();
    console.log(puntosEmpate);
    console.log(puntosLocal);
    console.log(puntosVisita);
    if (puntosLocal > puntosVisita) {
        document.getElementById('containerResultL').style.display = 'flex';
        document.getElementById('botonPartida').style.display = 'none';
        localStorage.clear();
        } else if (puntosLocal < puntosVisita) {
        document.getElementById('containerResultV').style.display = 'flex';
        document.getElementById('botonPartida').style.display = 'none';
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






/*https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=Zion Williamson*/

/*Usar addeventlistener onerror / tomar el nombre y apellido que se genero en el html / fetch con el link de arriba y ese nombre y apellido /  onerror='this.style.display = "none"' */