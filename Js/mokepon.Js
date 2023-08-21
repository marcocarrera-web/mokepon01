// Listas con informacion de los personajes del juego
const listaAtaques = ['fuego','agua','tierra']
const elementoAtaques = ['boton-fuego','boton-agua','boton-tierra']

// Constantes de botones de interacción en ataques
const contenedorTarjetas = document.getElementById("tarjetas")
const contenedorAtaques = document.getElementById("botones")
const botonReiniciar = document.getElementById("boton-reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascotas")
const resultadoDuelo = document.getElementById("resultado")
const jugadorDuelo = document.getElementById("ataque-jugador")
const rivalDuelo = document.getElementById("ataque-rival")

// Declaración de variables globales
let nombreAtaqueJugador, nombreAtaqueRival
let objetoMascota, objetoMascotaRival
let opcionDeMokepones, botonesAtaque
let vidasJugador, vidasRival
let todosLosBotones = []
let ataquesRival = []

// Crear clase Mokepon
class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = 'assets/' + foto
        this.vida = vida
        this.ataques = []
    }
}

// Mokepones objetos traidos de la clase

let mokepones = []
let piplup = new Mokepon('piplup','piplup.png', 3)
let turtwig = new Mokepon('turtwig','turtwig.png', 3)
let chimchar = new Mokepon('chimchar','chimchar.png', 3)
let wooper = new Mokepon('wooper','wooper.png', 3)
let volcanion = new Mokepon('volcanion','volcanion.png', 3)
let numel = new Mokepon('numel','numel.png', 3)

mokeponAtaques(piplup, [1,5,1])
mokeponAtaques(turtwig, [1,1,5])
mokeponAtaques(chimchar, [5,1,1])
mokeponAtaques(wooper, [3,3,1])
mokeponAtaques(volcanion, [3,1,3])
mokeponAtaques(numel, [1,3,3])

mokepones.push(piplup,turtwig,chimchar,wooper,volcanion,numel)

// Funcion principal del juego
function iniciarJuego(){
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label for="${mokepon.nombre}" class="mokepon">
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            <p>${capitalize(mokepon.nombre)}</p>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })
    botonMascotaJugador.addEventListener('click', seleccionarMascota)
    botonReiniciar.addEventListener('click', () => {location.reload()})
}

function mokeponAtaques(objeto, lista){
    for(let i=0; i < lista.length; i++){
        for(let j=0; j < lista[i]; j++){
            objeto.ataques.push({nombre: listaAtaques[i], id: elementoAtaques[i]})
        }}
}

// Funciones creadas para funciones minimas dentro del programa
function capitalize(string){ return string.charAt(0).toUpperCase() + string.slice(1)}
function random(min,max){ return Math.floor(Math.random() * (max - min + 1) + min)}

function creacionDeBotones(mokepon){
    mokepon.ataques.forEach((ataque)=> {
        if(ataque.nombre == "fuego"){emoji = '🔥'}
        else if(ataque.nombre == "agua"){emoji = '💧'}
        else{emoji = '🌱'}
        botonesAtaque = `<button id="${ataque.id}" class="opciones-boton">${emoji}</button>`

        contenedorAtaques.innerHTML += botonesAtaque
    }) 
    todosLosBotones = document.querySelectorAll('.opciones-boton')
}

function secuenciaAtaque(){
    todosLosBotones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            boton.disabled = true
            if(e.target.textContent == '🔥'){ seleccionAtaque('FUEGO')}
            else if(e.target.textContent == '💧'){ seleccionAtaque('AGUA') }
            else { seleccionAtaque('TIERRA') } 
        })
    })
}

function seleccionAtaque(ataque){
    nombreAtaqueJugador = ataque
    let indexAtaqueRival = random(0,ataquesRival.length - 1)
    nombreAtaqueRival = ataquesRival[indexAtaqueRival].toUpperCase()
    ataquesRival.splice(indexAtaqueRival,1)
    dueloDeAtaques()
}

function seleccionarMascota(){
    let mascotaNoEnLista = true
    for(let i = 0; i < mokepones.length; i++){
        if(document.getElementById(mokepones[i].nombre).checked){
            objetoMascota = mokepones[i]
            vidasJugador = mokepones[i].vida
            seleccionDeMascota(objetoMascota)
            vidasEnJuego()
            mascotaNoEnLista = false
            document.getElementById('lista-mascotas').style.display = 'none'
            document.getElementById('ataque').style.display = 'flex'
            creacionDeBotones(objetoMascota)
            secuenciaAtaque()
            break
        }}
        if(mascotaNoEnLista == true) {alert('Selecciona una opción')
}}

function seleccionDeMascota(objetoMascota){
    objetoMascotaRival = mokepones[random(0,5)]
    mascotaRival = capitalize(objetoMascotaRival.nombre)
    vidasRival = objetoMascotaRival.vida
    const listaImagen = ['imagen-jugador','imagen-rival']
    const listaVariablesImagen = [objetoMascota,objetoMascotaRival]
    if(objetoMascotaRival.nombre != objetoMascota.nombre){
        for(let i=0; i< listaImagen.length; i++){
            let tituloMascota = document.createElement('p')
            tituloMascota.innerHTML = capitalize(listaVariablesImagen[i].nombre)
            let imagenMascota = document.createElement('img')
            imagenMascota.src = listaVariablesImagen[i].foto
            document.getElementById(listaImagen[i]).appendChild(imagenMascota)
            document.getElementById(listaImagen[i]).appendChild(tituloMascota)
            arrayAtaquesRival(objetoMascotaRival)
        }     
    } else{seleccionDeMascota(objetoMascota)}
}

function arrayAtaquesRival(mokepon){
    ataquesRival = []
    for(let i=0; i<mokepon.ataques.length; i++){
        ataquesRival.push(capitalize(mokepon.ataques[i].nombre))
    }
}

function vidasEnJuego(){
    const corazonVivo = '💖'
    const corazonMuerto = '🖤'
    const player = ['vidas-jugador','vidas-rival']
    let vidas = [vidasJugador, vidasRival]
    for(let i=0; i < player.length; i++){
        let vidasPerdidas = 3 - vidas[i]
        let panelVidas = corazonVivo.repeat(vidas[i]) + corazonMuerto.repeat(vidasPerdidas)
        document.getElementById(player[i]).innerHTML = panelVidas
    }
}
function dueloDeAtaques(){
    let resultado
    let divJugador = jugadorDuelo.parentNode
    let divResultado = resultadoDuelo.parentNode
    let divRival = rivalDuelo.parentNode

    if((nombreAtaqueJugador == "FUEGO" && nombreAtaqueRival == "TIERRA") || (nombreAtaqueJugador == "TIERRA" && nombreAtaqueRival == "AGUA") || (nombreAtaqueJugador == "AGUA" && nombreAtaqueRival == "FUEGO")){
        vidasRival = vidasRival - 1
        divResultado.style.backgroundColor = 'green'
        resultado = "GANASTE"}
    else if(nombreAtaqueJugador == nombreAtaqueRival){ 
        resultado = "EMPATE" 
        divResultado.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'}
    else{ 
        vidasJugador = vidasJugador - 1
        divResultado.style.backgroundColor = 'red'
        resultado = "PERDISTE"}

    vidasEnJuego()

    panelDuelo(divJugador,nombreAtaqueJugador)
    panelDuelo(divRival,nombreAtaqueRival)

    jugadorDuelo.innerHTML = nombreAtaqueJugador
    resultadoDuelo.innerHTML = resultado
    rivalDuelo.innerHTML = nombreAtaqueRival

    comprobarVictoria()
}

function panelDuelo(div,ataque){
    if(ataque == 'FUEGO'){ div.style.backgroundColor = 'darkorange'}
    else if(ataque == 'AGUA'){ div.style.backgroundColor = 'mediumblue'}
    else{ div.style.backgroundColor = 'sienna'}
}

function comprobarVictoria(){
    if((vidasJugador == 0 || vidasRival == 0) || ataquesRival.length == 0){
        let resultadoDuelo = document.getElementById("mensaje-final")
        if(vidasRival == 0 || (vidasJugador > vidasRival)){
            resultadoDuelo.innerHTML = 'Tu ' + capitalize(objetoMascota.nombre) + ' ha VENCIDO!'}
        else if(vidasJugador == 0 || (vidasJugador < vidasRival)){
            resultadoDuelo.innerHTML = 'Tu ' + capitalize(objetoMascota.nombre) + ' ha sido DERROTADO :('}
        else {resultadoDuelo.innerHTML = 'EMPATE TECNICO'}
        let botonesJuego = document.getElementById('botones')
        botonesJuego.style.display = 'none'
        let reiniciarJuego = document.getElementById('reiniciar')
        reiniciarJuego.style.display = 'flex'
}}

window.addEventListener('load',iniciarJuego)