let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3



function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let btnMascotaJugador = document.getElementById('btn-mascota') 

    btnMascotaJugador.addEventListener('click',seleccionarMascotaJugador)

    let btnFuego = document.getElementById('btn-fuego')
    let btnAgua = document.getElementById('btn-agua')
    let btnTierra = document.getElementById('btn-tierra')
    let btnReiniciar = document.getElementById('btn-reiniciar')
    

    
    btnFuego.addEventListener('click',ataqueFuego)
    btnAgua.addEventListener('click',ataqueAgua)
    btnTierra.addEventListener('click',ataqueTierra)
    btnReiniciar.addEventListener('click',reiniciarJuego)

    btnReiniciar.style.display = 'none'
    

}    

function seleccionarMascotaJugador(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    

    let error = false
    let inputHipodogue = document.getElementById('hipodogue')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

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
        sectionSeleccionarAtaque.style.display = 'block'
        sectionSeleccionarMascota.style.display = 'none'
    }
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
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
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
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = "Tu mascota atacó con "+ataqueJugador + ", la mascota del enemigo atacó con " +ataqueEnemigo + "->"+resultado
    sectionMensajes.appendChild(parrafo)
}
function crearMensajeFinal(ganador){
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    if(ganador == "jugador"){
        parrafo.innerHTML = "Felicidades ganaste"
    }else{
        parrafo.innerHTML = "F perdiste"
    }
    sectionMensajes.appendChild(parrafo)

    let btnAgua = document.getElementById('btn-agua')
    let btnFuego = document.getElementById('btn-fuego')
    let btnTierra = document.getElementById('btn-tierra')

    btnAgua.disabled = true
    btnFuego.disabled = true
    btnTierra.disabled = true

    let btnReiniciar = document.getElementById('btn-reiniciar')
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