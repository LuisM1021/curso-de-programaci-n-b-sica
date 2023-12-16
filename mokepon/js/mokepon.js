let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3



function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota') 

    btnMascotaJugador.addEventListener('click',seleccionarMascotaJugador)

    let btnFuego = document.getElementById('btn-fuego')
    let btnAgua = document.getElementById('btn-agua')
    let btnTierra = document.getElementById('btn-tierra')
    

    
    btnFuego.addEventListener('click',ataqueFuego)
    btnAgua.addEventListener('click',ataqueAgua)
    btnTierra.addEventListener('click',ataqueTierra)
    

}    

    

function seleccionarMascotaJugador(){
    let inputHipodogue = document.getElementById('hipodogue')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = "Hipodogue"
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo"
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya"
    }else{
        alert("No seleccionaste personaje")
    }
    seleccionarMascotaEnemigo()
}
    


function seleccionarMascotaEnemigo(){
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    let mascota = aleatorio(1,3)
    if(mascota == 1){
        spanMascotaEnemigo.innerHTML = "Hipodogue"
    }else if(mascota == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
    }
    else if(mascota == 3){
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }
}

function ataqueFuego(){
    ataqueJugador = "FUEGO"
    ataqueDelEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueDelEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
    ataqueDelEnemigo()
}

function ataqueDelEnemigo(){
    let ataque = aleatorio(1,3)
    if(ataque==1){
        ataqueEnemigo = "FUEGO"
    }else if(ataque==2){
        ataqueEnemigo = "AGUA"
    }else{
        ataqueEnemigo = "TIERRA"
    }
    crearMensaje()

}
function crearMensaje(){
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    let resultado = combate()
    parrafo.innerHTML = "Tu mascota atacó con "+ataqueJugador + ", la mascota del enemigo atacó con " +ataqueEnemigo + "->"+resultado
    sectionMensajes.appendChild(parrafo)
}

function combate(){
    let resultado
    if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        resultado = "GANASTE"
    }else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        resultado = "GANASTE"
    }else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        resultado = "GANASTE"
    }else if(ataqueJugador==ataqueEnemigo){
        resultado = "EMPATE"
    }else{
        resultado = "PERDISTE"
    }
    actualizarVidas(resultado)
    return resultado
}

function actualizarVidas(resultado){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    if(resultado == "GANASTE"){
        vidasEnemigo--
    }else if (resultado == "PERDISTE"){
        vidasJugador--
    }
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego)