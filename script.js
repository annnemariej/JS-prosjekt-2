// LYD
const bakgrunnsMusikk = new Audio('bakgrunnsmusikk.mp3')

//TODO LAGE EN START KNAPP
window.addEventListener('keydown', function() {
    bakgrunnsMusikk.loop = true;
    bakgrunnsMusikk.volume = 0.05;
    bakgrunnsMusikk.play();
});

const jumpSound = new Audio('retro-jump.mp3')
const runSound = new Audio("run.mp3")




const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 600
canvas.height = 450

// Lager spilleren
const spiller = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    speed: 5,
    dx: 0, // Initialiser dx til 0
    dy: 0,
    gravity: 0.5,
    jumpPower: -10, 
    onGround: false,
    color: "blue", 
}

function tegneSpiller() {
    ctx.fillStyle = spiller.color;
    ctx.fillRect(spiller.x, spiller.y, spiller.width, spiller.height) 
}

ctx.lineWidth = 10

// Plattformobjekter
const platform2 = { x1: 600, y1: 300, x2: 300, y2: 350, color: "green" }
const platform3 = { x1: 0, y1: 225, x2: 300, y2: 275, color: "pink" }
const platform4 = { x1: 600, y1: 150, x2: 300, y2: 200, color: "purple" }
const platform5 = { x1: 0, y1: 100, x2: 300, y2: 100, color: "red" } 

// Tegner en plattform
function tegnLinje(platform) {
    ctx.strokeStyle = platform.color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(platform.x1, platform.y1);
    ctx.lineTo(platform.x2, platform.y2);
    ctx.stroke();
}

tegnLinje(platform2)
tegnLinje(platform3)
tegnLinje(platform4)
tegnLinje(platform5)

function holderKeys(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        spiller.dx = spiller.speed;  // Flytter spilleren til høyre
        runSound.play()
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        spiller.dx = -spiller.speed;  // Spilleren går til venstre
        runSound.play()
    } else if (event.key === "ArrowUp" || event.key === "w") {
        if (spiller.onGround) {
            spiller.dy = spiller.jumpPower; // Spilleren hopper
            spiller.onGround = false;
            jumpSound.play()
        }
    }
}

function sluppetKey(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "d" || event.key === "a") {
        spiller.dx = 0;  // Stopper bevegelse
        runSound.pause()
        runSound.currentTime=0
    }
}

function update() {
    // Oppdater spillerens posisjon
    spiller.x += spiller.dx
    spiller.y += spiller.dy

    // Tyngdekraft
    if (spiller.y + spiller.height < canvas.height) {
        spiller.dy += spiller.gravity;
    } else {
        spiller.dy = 0;
        spiller.y = canvas.height - spiller.height;
        spiller.onGround = true;
    }

    // Sjekk at spilleren ikke går utenfor skjermen 
    if (spiller.x < 0) {
        spiller.x = 0; // Hvis spilleren går utenfor venstre kant
    } else if (spiller.x + spiller.width > canvas.width) {
        spiller.x = canvas.width - spiller.width; // Hvis spilleren går utenfor høyre kant
    }

    // Tegn bakgrunnen og plattformene på nytt
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tegnLinje(platform2)
    tegnLinje(platform3)
    tegnLinje(platform4)
    tegnLinje(platform5)

    // Tegn spilleren
    tegneSpiller()

    // Kall update-funksjonen på nytt
    requestAnimationFrame(update)
}

// Hendelseslyttere for tastetrykk
window.addEventListener("keydown", holderKeys)
window.addEventListener("keyup", sluppetKey)

update();

