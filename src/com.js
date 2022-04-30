
const equipoRivalRandom = []
const equipoRivalOrden = []
const er = []




window.onload = jugadoresAleatorios ()



function jugadoresAleatorios () {
    fetch('players.json')
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < 5; i++) {
            let randomInt = Math.round(Math.random()*(data.length -1));
            equipoRivalRandom.push(data[randomInt]);
            console.log(equipoRivalRandom)
        }
    })
    .then(estadisticasJugadoresRandom());
}



function estadisticasJugadoresRandom (){
    for (let i = 0; i < equipoRivalRandom.length; i++){
        fetch(`https://www.balldontlie.io/api/v1/players?search=${equipoRivalRandom[i].firstName}%20${equipoRivalRandom[i].lastName}`)
        .then((res) => res.json())
        .then((data) => {
            //const getId = data.data[0].id
            if (data.data[0].id === undefined || data.data[0].id === null) return fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=237`)
            else return fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${data.data[0].id}`)})
        .then((res) => res.json())
        .then((estadisticas) => {
            if (estadisticas.data[0] === undefined || estadisticas.data[0] === null){
                equipoRival.push(jugadorAlternativo)
                localStorage.setItem("equipoRival", JSON.stringify(equipoRival));
                document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;
            }else {
                equipoRival.push(estadisticas.data[0])
                localStorage.setItem("equipoRival", JSON.stringify(equipoRival));
                document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;}
        return fetch(`https://www.balldontlie.io/api/v1/players/${estadisticas.data[0].player_id}`)})
        .then((res) => res.json())
        .then((names) => {
            if(names.id !== undefined) {
            const combinarNombre = equipoRival.find (equipoRival => equipoRival.player_id === names.id)
            combinarNombre.nombre = `${names.first_name}`;
            combinarNombre.apellido = `${names.last_name}`;}
            })
    }
    console.log(equipoRival)
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
        let jugadorRepetidoMiEquipo = miEquipo.some(miEquipo => miEquipo.player_id === estadisticas.data[0].player_id)
        if(jugadorRepetidoMiEquipo === true){
            swal({
                title: "Este jugador ya ha sido elegido en algún equipo",
                text: "Debes elegir otro jugador",
                icon: "error",
                button: "Continuar",
            });
        }
        if(miEquipo.length < 5 && jugadorRepetidoMiEquipo === false && estadisticas.data[0] !== undefined){
            miEquipo.push(estadisticas.data[0])
            localStorage.setItem("miEquipo", JSON.stringify(miEquipo));
            document.getElementById('cantidadJugadores').innerHTML = miEquipo.length;
            console.log(estadisticas.data[0])
        } if(miEquipo.length > 5) {
            botonDehabilitado.disabled = true;
            swal({
                title: "Ya elegiste todos los jugadores de tu equipo",
                text: "Ya puedes realizar el enfrentamiento",
                icon: "error",
                button: "Continuar",
            });
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
        }
    })
    }

function ordenRandom() {
    equipoRival.sort((a, b) => parseFloat(b.pts) - parseFloat(a.pts))
    equipoRivalOrden.push(equipoRival[0])
    equipoRival.splice(0, 1)
    equipoRival.sort((a, b) => parseFloat(b.fg3m) - parseFloat(a.fg3m))
    equipoRivalOrden.push(equipoRival[0])
    equipoRival.splice(0, 1)
    equipoRival.sort((a, b) => parseFloat(b.ast) - parseFloat(a.ast))
    equipoRivalOrden.push(equipoRival[0])
    equipoRival.splice(0, 1)
    equipoRival.sort((a, b) => parseFloat(b.reb) - parseFloat(a.reb))
    equipoRivalOrden.push(equipoRival[0])
    equipoRivalOrden.push(equipoRival[1])
    equipoRival.splice(0, 2)
    for(let i = 0; i < 5; i++){
        equipoRival.push(equipoRivalOrden[i]);
    }
}






/*https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=Zion Williamson*/

/*Usar addeventlistener onerror / tomar el nombre y apellido que se genero en el html / fetch con el link de arriba y ese nombre y apellido /  onerror='this.style.display = "none"' */