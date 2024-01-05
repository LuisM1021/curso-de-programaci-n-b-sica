const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const btnMascotaJugador = document.getElementById('btn-mascota')

const btnReiniciar = document.getElementById('btn-reiniciar')


const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
let error = false

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')

const sectionMensajes = document.getElementById('resultado')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const botonesAtaque = document.getElementById('botones-ataque')

let btnAgua
let btnTierra
let btnFuego

let mokepones = []
// let ataqueJugador
let mascotaJugador
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodogue
let inputCapipepo
let inputRatigueya
let vidasJugador = 3
let vidasEnemigo = 3
let ataqueMokepon
let ataquesMokeponEnemigo = []
let botones = []
let ataqueDeJugador = []
let victoriasJugador = 0
let victoriasEnemigo = 0

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
    }
}

let hipodogue = new Mokepon("Hipodogue","assets/mokepons_mokepon_hipodoge_attack.png",5)
let capipepo = new Mokepon("Capipepo","assets/mokepons_mokepon_capipepo_attack.png",5)
let ratigueya = new Mokepon("Ratigueya","assets/mokepons_mokepon_ratigueya_attack.png",5)

// let cr7 = new Mokepon("Cristiano Ronaldo cr7","https://th.bing.com/th/id/OIP.1CBXsd9HagOaD_voR4yYRQHaEK?w=333&h=187&c=7&r=0&o=5&pid=1.7",5)

mokepones.push(hipodogue,capipepo,ratigueya)
hipodogue.ataques.push(
    {nombre: "💧", id: "btn-agua"},
    {nombre: "💧", id: "btn-agua"},
    {nombre: "💧", id: "btn-agua"},
    {nombre: "🔥", id: "btn-fuego"},
    {nombre: "🌱", id: "btn-tierra"}
)
capipepo.ataques.push(
    {nombre: "🌱", id: "btn-tierra"},
    {nombre: "🌱", id: "btn-tierra"},
    {nombre: "🌱", id: "btn-tierra"},
    {nombre: "💧", id: "btn-agua"},
    {nombre: "🔥", id: "btn-fuego"}
    
)
ratigueya.ataques.push(
    {nombre: "🔥", id: "btn-fuego"},
    {nombre: "🔥", id: "btn-fuego"},
    {nombre: "🔥", id: "btn-fuego"},
    {nombre: "💧", id: "btn-agua"},
    {nombre: "🌱", id: "btn-tierra"}
)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}">
                <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
                    <p>${mokepon.nombre}</p>
                    <img src="${mokepon.foto}" alt="${mokepon.nombre}">
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodogue = document.getElementById('Hipodogue')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    btnMascotaJugador.addEventListener('click',seleccionarMascotaJugador)

    // btnFuego.addEventListener('click',ataqueFuego)
    // btnAgua.addEventListener('click',ataqueAgua)
    // btnTierra.addEventListener('click',ataqueTierra)
    btnReiniciar.addEventListener('click',reiniciarJuego)

    btnReiniciar.style.display = 'none'
}    

function seleccionarMascotaJugador(){
    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = inputHipodogue.id
        error = false
        mascotaJugador = inputHipodogue.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        error = false
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        error = false
        mascotaJugador = inputRatigueya.id
    }else{
        alert("No seleccionaste personaje")
        error = true
    }
    if(!error){
        activarAtaques()
        seleccionarMascotaEnemigo() 
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'
    }
}
    


function seleccionarMascotaEnemigo(){
    let mascota = aleatorio(0,mokepones.length-1)

    spanMascotaEnemigo.innerHTML = mokepones[mascota].nombre
    ataquesMokeponEnemigo = mokepones[mascota].ataques
    secuenciaAtaques()
}

function activarAtaques(){
    
    mokepones.forEach((mokepon)=>{
        if (mokepon.nombre == mascotaJugador){
            mokepon.ataques.forEach((ataque)=>{
                ataqueMokepon = `
                <button id="${ataque.id}" class="btn-ataque">${ataque.nombre}</button>
                `
                botonesAtaque.innerHTML += ataqueMokepon
            })
        }
    })
    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')

    botones = document.querySelectorAll('.btn-ataque')

}

function secuenciaAtaques(){
    botones.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
            if(e.target.textContent === "🔥"){
                ataqueDeJugador.push("FUEGO")
                console.log(ataqueDeJugador)
                btn.style.background = "#112f58"
            }else if(e.target.textContent === "💧"){
                ataqueDeJugador.push("AGUA")
                console.log(ataqueDeJugador)
                btn.style.background = "#112f58"
            }else{
                ataqueDeJugador.push("TIERRA")
                console.log(ataqueDeJugador)
                btn.style.background = "#112f58"
            }
            btn.disabled = true
            ataqueDeEnemigo()
        })
    })
    
}


function ataqueDeEnemigo(){
    let ataque = aleatorio(0,ataquesMokeponEnemigo.length-1)



    if(ataque==0||ataque==1){
        ataqueEnemigo.push("FUEGO")
    }else if(ataque==3||ataque==4){
        ataqueEnemigo.push("AGUA")
    }else{
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    // combate();
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueDeJugador.length == 5){
        combate()
    }
}
function combate(){
    let ganador
    for (let i = 0; i<ataqueDeJugador.length; i++){
        if(ataqueDeJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA"){
            victoriasJugador++
            ganador = "jugador"
        } else if(ataqueDeJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO"){
            victoriasJugador++
            ganador = "jugador"
        } else if(ataqueDeJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA"){
            victoriasJugador++
            ganador = "jugador"
        } else if(ataqueDeJugador[i] ==ataqueEnemigo[i]){
            ganador = "empate"
        }else{
            victoriasEnemigo++
            ganador = "enemigo"
        }
        mostrarAtaques(ataqueDeJugador[i],ataqueEnemigo[i],ganador)
        
    }
    crearMensajeFinal()
    actualizarVictorias()
}

function actualizarVictorias(){
    spanVidasJugador.innerHTML = victoriasJugador
    spanVidasEnemigo.innerHTML = victoriasEnemigo
}
function mostrarAtaques(atqJugador,atqEnemigo,ganador){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    nuevoAtaqueJugador.innerHTML = atqJugador
    nuevoAtaqueEnemigo.innerHTML = atqEnemigo
    if(ganador == "jugador"){
        nuevoAtaqueJugador.style.color = "#65B741"
        nuevoAtaqueEnemigo.style.color = "#750E21"
    }else if(ganador == "enemigo"){
        nuevoAtaqueJugador.style.color = "#750E21"
        nuevoAtaqueEnemigo.style.color = "#65B741"
    }else{
        nuevoAtaqueJugador.style.color = "#F4F27E"
        nuevoAtaqueEnemigo.style.color = "#F4F27E"
    }
    /////arreglar lo del colloororrorror

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(){
    if(victoriasJugador > victoriasEnemigo){
        sectionMensajes.innerHTML = "Felicidades ganaste"
    }else if(victoriasJugador<victoriasEnemigo){
        sectionMensajes.innerHTML = "Fin del juego, perdiste"
    }else{
        sectionMensajes.innerHTML = "Hubo un empate"
    }

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