
const equipoRivalRandom = []
const equipoRivalOrden = []
const jugadorAlternativo = {nombre: "LeBron", apellido: "James", games_played: 53, player_id: 237, season: 2021, fg3m: 2.79, reb: 8.17, ast: 6.34, stl: 1.36, blk: 1.04, pts: 29.89}




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
    .then(setTimeout(estadisticasJugadoresRandom, 2000));
}

function s (){
    console.log(aaa)
}

function estadisticasJugadoresRandom (){
    for (let i = 0; i < equipoRivalRandom.length; i++){
        fetch(`https://www.balldontlie.io/api/v1/players?search=${equipoRivalRandom[i].firstName}%20${equipoRivalRandom[i].lastName}`)
        .then((res) => res.json())
        .then((data) => {
            //const getId = data.data[0].id
            console.log(data.data[0].id)
            if (data.data[0].id !== undefined || data.data[0].id !== null) return fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${data.data[0].id}`)
        }) 
        .then((res) => res.json())
        .then((estadisticas) => {
            if (estadisticas.data[0] === undefined || estadisticas.data[0] === null){
                equipoRival.push(jugadorAlternativo)
                document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;
            }else {
                equipoRival.push(estadisticas.data[0])
                document.getElementById('cantidadJugadoresVisita').innerHTML = equipoRival.length;}
                return fetch(`https://www.balldontlie.io/api/v1/players/${estadisticas.data[0].player_id}`)
        })
        .then((res) => res.json())
        .then((names) => {
            if(names.id !== undefined) {
            const combinarNombre = equipoRival.find (equipoRival => equipoRival.player_id === names.id)
            combinarNombre.nombre = `${names.first_name}`;
            combinarNombre.apellido = `${names.last_name}`;}
            })
    }
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
    equipoRival.splice(0, 10)
    console.log(equipoRival)
    for(let i = 0; i < 5; i++){
        equipoRival.push(equipoRivalOrden[i]);
    }
}






/*https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=Zion Williamson*/

/*Usar addeventlistener onerror / tomar el nombre y apellido que se genero en el html / fetch con el link de arriba y ese nombre y apellido /  onerror='this.style.display = "none"' */