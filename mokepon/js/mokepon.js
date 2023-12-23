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
        sectionSeleccionarAtaque.style.display = 'flex'
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
    let resultadoPelea = document.getElementById('resultado')
    let ataqueDelJugador = document.getElementById('ataque-jugador')
    let ataqueDelEnemigo = document.getElementById('ataque-enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    resultadoPelea.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)

}

function crearMensajeFinal(ganador){
    let sectionMensajes = document.getElementById('resultado')
    if(ganador == "jugador"){
        sectionMensajes.innerHTML = "Felicidades ganaste"
    }else{
        sectionMensajes.innerHTML = "Fin del juego, perdiste"
    }

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