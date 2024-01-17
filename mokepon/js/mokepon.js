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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let btnAgua
let btnTierra
let btnFuego

let jugadorId = null
let mokepones = []
let mokeponesEnemigos = []
// let ataqueJugador
let indexMascotaJugador
let indexMascotaEnemigo
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
let lienzo = mapa.getContext("2d")
let intervalo 
let anchoMapa = window.innerWidth - 20

const limiteAnchoMapa = 350
if (anchoMapa > limiteAnchoMapa){
    anchoMapa = limiteAnchoMapa - 20
}

let alturaMapa = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaMapa

let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'


class Mokepon{
    constructor(nombre, foto, vida, poder, fotoMapa,index){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
        this.poder = poder
        this.ancho = 40
        this.alto = 40
        this.x = 0
        this.y = 0 
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.index = index
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
    evitarSalidaDePantalla(){
        if(this.x>=(mapa.width-this.ancho)){
            this.x = (mapa.width-this.ancho)
        }else if(this.x<=0){
            this.x = 0
        }
        if(this.y>=(mapa.height-this.alto)){
            this.y = (mapa.height-this.alto)
        }else if(this.y<=0){
            this.y = 0
        }
    }
}

let hipodogue = new Mokepon("Hipodogue","assets/mokepons_mokepon_hipodoge_attack.png",5,"💧","assets/hipodoge.png",0)
let capipepo = new Mokepon("Capipepo","assets/mokepons_mokepon_capipepo_attack.png",5, "🌱","assets/capipepo.png",1)
let ratigueya = new Mokepon("Ratigueya","assets/mokepons_mokepon_ratigueya_attack.png",5,"🔥","assets/ratigueya.png",2)
let hipodogueEnemigo = new Mokepon("Hipodogue","assets/mokepons_mokepon_hipodoge_attack.png",5,"💧","assets/hipodoge.png",-1)
let capipepoEnemigo = new Mokepon("Capipepo","assets/mokepons_mokepon_capipepo_attack.png",5, "🌱","assets/capipepo.png",-1)
let ratigueyaEnemigo = new Mokepon("Ratigueya","assets/mokepons_mokepon_ratigueya_attack.png",5,"🔥","assets/ratigueya.png",-1)

// let cr7 = new Mokepon("Cristiano Ronaldo cr7","https://th.bing.com/th/id/OIP.1CBXsd9HagOaD_voR4yYRQHaEK?w=333&h=187&c=7&r=0&o=5&pid=1.7",5)
mokeponesEnemigos.push(hipodogueEnemigo,capipepoEnemigo,ratigueyaEnemigo)
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
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}">
                <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
                    <p>${mokepon.nombre} ${mokepon.poder}</p>
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
    unirseAlJuego()
}    
function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            // console.log(res)
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function seleccionarMascotaJugador(){
    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = inputHipodogue.id + mokepones[0].poder
        error = false
        indexMascotaJugador = 0
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id + mokepones[1].poder
        error = false
        indexMascotaJugador = 1
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id + mokepones[2].poder
        error = false
        indexMascotaJugador = 2
    }else{
        alert("No seleccionaste personaje")
        error = true
    }
    if(!error){
        seleccionarMokepon(mokepones[indexMascotaJugador].nombre)
        //sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'
        iniciarMapa()
    }
}
    
function seleccionarMokepon(mascotaJugador){
    fetch("http://localhost:8080/mokepon/" + jugadorId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionarMascotaEnemigo(nombreEnemigo){
    // let mascota = aleatorio(0,mokepones.length-1)
    let mokeponEncontrado = false
    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre == nombreEnemigo && !mokeponEncontrado){
            spanMascotaEnemigo.innerHTML = mokepon.nombre + mokepon.poder
            ataquesMokeponEnemigo = mokepon.ataques
            indexMascotaEnemigo = mokepon.index
            mokeponEncontrado = true
        }
    })
    activarAtaques()
    secuenciaAtaques()
}

function activarAtaques(){
    mokepones.forEach((mokepon)=>{
        if (mokepon.nombre == mokepones[indexMascotaJugador].nombre){
            mokepon.ataques.forEach((ataque)=>{
                ataqueMokepon = `
                <button id="${ataque.id}" class="btn-ataque">${ataque.nombre}</button>
                `
                botonesAtaque.innerHTML += ataqueMokepon
            })
        }
    })
    ataqueExtra()
    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')

    botones = document.querySelectorAll('.btn-ataque')

}
function ataqueExtra(){
    let ataqueAleatorio = aleatorio(1,3)
    let nombreAtaque
    let idAtaque
    let personajeGanador

    switch (ataqueAleatorio){
        case 1: 
            nombreAtaque = "💧"
            idAtaque = "btn-agua"
            break
        case 2: 
            nombreAtaque = "🔥"
            idAtaque = "btn-fuego"
            break
        case 3: 
            nombreAtaque = "🌱"
            idAtaque = "btn-tierra"
            break
    }

    if(mokepones[indexMascotaJugador].poder == "💧" && mokepones[indexMascotaEnemigo].poder == "🔥"){
        personajeGanador = "jugador"
        sectionMensajes.innerHTML += "<br>¡Recibiste un ataque extra!"
        console.log("Recibiste un ataque extra")
    }else if(mokepones[indexMascotaJugador].poder == "🔥" && mokepones[indexMascotaEnemigo].poder == "🌱"){
        personajeGanador = "jugador"
        sectionMensajes.innerHTML += "<br>¡Recibiste un ataque extra!"
        console.log("Recibiste un ataque extra")
    }else if(mokepones[indexMascotaJugador].poder == "🌱" && mokepones[indexMascotaEnemigo].poder == "💧"){
        personajeGanador = "jugador"
        sectionMensajes.innerHTML += "<br>¡Recibiste un ataque extra!"
        console.log("Recibiste un ataque extra")
    }else if(indexMascotaJugador==indexMascotaEnemigo){
        personajeGanador = "empate"
    }else{
        personajeGanador = "enemigo"
        sectionMensajes.innerHTML += "<br>!El enemigo recibió un ataque extra!"
        console.log("El enemigo recibió un ataque extra")
    }

    if(personajeGanador == "jugador"){
        ataqueMokepon = `
                <button id="${idAtaque}" class="btn-ataque">${nombreAtaque}</button>
                `
                botonesAtaque.innerHTML += ataqueMokepon
    }else if(personajeGanador == "enemigo"){
        ataquesMokeponEnemigo.push({nombre: nombreAtaque, id: null})
    }
}
function secuenciaAtaques(){
    botones.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
            if(e.target.textContent === "🔥"){
                ataqueDeJugador.push("🔥")
                console.log(ataqueDeJugador)
                btn.style.background = "#112f58"
            }else if(e.target.textContent === "💧"){
                ataqueDeJugador.push("💧")
                console.log(ataqueDeJugador)
                btn.style.background = "#112f58"
            }else{
                ataqueDeJugador.push("🌱")
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
    console.log(ataque)
    ataqueEnemigo.push(ataquesMokeponEnemigo[ataque].nombre)
    ataquesMokeponEnemigo.splice(ataque,1)
    console.log(ataqueEnemigo)
    console.log(ataquesMokeponEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueDeJugador.length == 5){
        botones.forEach((btn)=>{
            if(btn.disabled == false){
                btn.disabled = true
            }
        })
        combate()
    }
}
function combate(){
    let ganador
    for (let i = 0; i<ataqueDeJugador.length; i++){
        if(ataqueDeJugador[i] == "🔥" && ataqueEnemigo[i] == "🌱"){
            victoriasJugador++
            ganador = "jugador"
        } else if(ataqueDeJugador[i] == "💧" && ataqueEnemigo[i] == "🔥"){
            victoriasJugador++
            ganador = "jugador"
        } else if(ataqueDeJugador[i] == "🌱" && ataqueEnemigo[i] == "💧"){
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
function pintarCanvas(){
    mokepones[indexMascotaJugador].x = mokepones[indexMascotaJugador].x + mokepones[indexMascotaJugador].velocidadX 
    mokepones[indexMascotaJugador].y = mokepones[indexMascotaJugador].y + mokepones[indexMascotaJugador].velocidadY 
    lienzo.clearRect(0,0,mapa.clientWidth,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokepones[indexMascotaJugador].evitarSalidaDePantalla()
    mokepones[indexMascotaJugador].pintarMokepon()

    enviarPosicion(mokepones[indexMascotaJugador].x,mokepones[indexMascotaJugador].y)

    hipodogueEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    if(mokepones[indexMascotaJugador].velocidadX!=0 || mokepones[indexMascotaJugador].velocidadY){
        revisarColision(hipodogueEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}

function teclaMovimiento(event){
    switch(event.key){
        case "ArrowUp":
            mover('arriba')
            break
        case "ArrowDown":
            mover('abajo')
            break
        case "ArrowLeft":
            mover('izquierda')
            break
        case "ArrowRight":
            mover('derecha')
            break
        default: 
            break;
    }
}
function mover(direccion){
    switch (direccion){
        case "arriba":
            mokepones[indexMascotaJugador].velocidadY = -5
            break
        case "abajo":
            mokepones[indexMascotaJugador].velocidadY = 5
            break
        case "izquierda":
            mokepones[indexMascotaJugador].velocidadX = -5
            break
        case "derecha":
            mokepones[indexMascotaJugador].velocidadX = 5
            break
    }
}
function detenerMovimiento(){
    mokepones[indexMascotaJugador].velocidadX = 0
    mokepones[indexMascotaJugador].velocidadY = 0
}
function iniciarMapa(){
    sectionVerMapa.style.display = 'flex'
    definirPosicionesIniciales()
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener('keydown',teclaMovimiento)
    window.addEventListener('keyup',detenerMovimiento)
    
}
function definirPosicionesIniciales(){
    const posicionesBloqueadas ={
        x: [],
        y: [],
        cont: 0
    }
    let cortar = 0
    let posX
    let posY
    posX = aleatorio(0,mapa.width-mokepones[indexMascotaJugador].ancho)
    posY = aleatorio(0,mapa.height-mokepones[indexMascotaJugador].alto)
    mokepones[indexMascotaJugador].x = posX
    mokepones[indexMascotaJugador].y = posY
    posicionesBloqueadas.x[0] = posX
    posicionesBloqueadas.y[0] = posY
    posicionesBloqueadas.cont ++
    console.log(`${mokepones[indexMascotaJugador].nombre}: (${posX},${posY})`)
    mokeponesEnemigos.forEach((mokepon)=>{
        let posicionPermitida = false
        for(let it=0;it<=posicionesBloqueadas.cont;it++){
            console.log("Iteración de posicionesBloquedas: "+it)
            do{
                if(!posicionPermitida){
                    posX = aleatorio(0,mapa.width-mokepon.ancho)
                    posY = aleatorio(0,mapa.height-mokepon.alto)
                }
                
                if(posX<=(posicionesBloqueadas.x[it]+40)&&posY<=(posicionesBloqueadas.y[it]+40)&&posX>=(posicionesBloqueadas.x[it]-40)&&posY>=(posicionesBloqueadas.y[it]-40)){
                    posicionPermitida = false
                    console.log(`Si ${posX} es menor o igual que ${posicionesBloqueadas.x[it]+40} y ${posY} es menor o igual que${posicionesBloqueadas.y[it]+40} y ${posX} es mayor o igual que ${posicionesBloqueadas.x[it]-40} y ${posY} es mayor o igual que${posicionesBloqueadas.y[it]-40}entonces el mokepon ${mokepon.nombre} no toma la posicion: ${posX},${posY})`)
                }else{
                    posicionPermitida = true
                    console.log(`Posicion de ${mokepon.nombre}: (${posX},${posY})`)
                }
                cortar++
            }while(!posicionPermitida&&(cortar!=10))
        }
        posicionesBloqueadas.x.push(posX)
        posicionesBloqueadas.y.push(posY)
        posicionesBloqueadas.cont ++
        mokepon.x=posX
        mokepon.y=posY
        console.log(posicionesBloqueadas.cont)
    })

}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mokepones[indexMascotaJugador].y
    const abajoMascota = mokepones[indexMascotaJugador].y + mokepones[indexMascotaJugador].alto
    const derechaMascota = mokepones[indexMascotaJugador].x + mokepones[indexMascotaJugador].ancho
    const izquierdaMascota = mokepones[indexMascotaJugador].x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota>abajoEnemigo ||
        derechaMascota< izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    else{
        clearInterval(intervalo)
        detenerMovimiento()
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo.nombre) 
        // alert("Colisión con "+enemigo.nombre)
    }
}
window.addEventListener('load',iniciarJuego)