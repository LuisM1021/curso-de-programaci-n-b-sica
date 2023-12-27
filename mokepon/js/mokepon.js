const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const btnMascotaJugador = document.getElementById('btn-mascota')
const btnAgua = document.getElementById('btn-agua')
const btnTierra = document.getElementById('btn-tierra')
const btnReiniciar = document.getElementById('btn-reiniciar')
const btnFuego = document.getElementById('btn-fuego')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
let error = false
const inputHipodogue = document.getElementById('hipodogue')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const resultadoPelea = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')

const sectionMensajes = document.getElementById('resultado')

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3



function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'

    btnMascotaJugador.addEventListener('click',seleccionarMascotaJugador)

    btnFuego.addEventListener('click',ataqueFuego)
    btnAgua.addEventListener('click',ataqueAgua)
    btnTierra.addEventListener('click',ataqueTierra)
    btnReiniciar.addEventListener('click',reiniciarJuego)

    btnReiniciar.style.display = 'none'
}    

function seleccionarMascotaJugador(){
    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = "Hipodogue"
        error = false
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo"
        error = false
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya"
        error = false
    }else{
        alert("No seleccionaste personaje")
        error = true
    }
    if(!error){
        seleccionarMascotaEnemigo() 
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'
    }
}
    


function seleccionarMascotaEnemigo(){
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
    ataqueDeEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueDeEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
    ataqueDeEnemigo()
}

function ataqueDeEnemigo(){
    let ataque = aleatorio(1,3)
    if(ataque==1){
        ataqueEnemigo = "FUEGO"
    }else if(ataque==2){
        ataqueEnemigo = "AGUA"
    }else{
        ataqueEnemigo = "TIERRA"
    }
    
    combate();
}


function combate(){
    let resultado
    if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        
        resultado = "Ganaste"
    }else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        
        resultado = "Ganaste"
    }else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        
        resultado = "Ganaste"
    }else if(ataqueJugador==ataqueEnemigo){
        resultado = "Empate"
    }else{
        
        resultado = "Perdiste"
    }
    crearMensaje(resultado)
    actualizarVidas(resultado)
}

function actualizarVidas(resultado){
    if(resultado == "Ganaste"){
        vidasEnemigo--
    }else if (resultado == "Perdiste"){
        vidasJugador--
    }
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo

    if(vidasEnemigo==0){
        crearMensajeFinal("jugador")
    }else if(vidasJugador==0){
        crearMensajeFinal("enemigo")
    }
}
function crearMensaje(resultado){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    resultadoPelea.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)

}

function crearMensajeFinal(ganador){
    if(ganador == "jugador"){
        sectionMensajes.innerHTML = "Felicidades ganaste"
    }else{
        sectionMensajes.innerHTML = "Fin del juego, perdiste"
    }

    btnAgua.disabled = true
    btnFuego.disabled = true
    btnTierra.disabled = true

    btnReiniciar.style.display = 'block'
    btnReiniciar.style.backgroundColor= 'rgb(0,255,0)'
}
function reiniciarJuego(){
    location.reload()
}   

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego)