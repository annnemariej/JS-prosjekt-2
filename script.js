document.getElementById("minCanvas").style.visibility = "hidden"
document.getElementById("cover").style.visibility = "visible"

function visCanvas(){
    document.getElementById("minCanvas").style.visibility = "visible"
    document.getElementById("cover").style.visibility = "hidden"
}
// LYD
const bakgrunnsMusikk = new Audio('bakgrunnsmusikk.mp3')

//TODO LAGE EN START KNAPP
window.addEventListener('keydown', function() {
    bakgrunnsMusikk.loop = true
    bakgrunnsMusikk.volume = 0.05
    bakgrunnsMusikk.play()
})

const jumpSound = new Audio('retro-jump.mp3')
const runSound = new Audio("run.mp3")

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 650

// Lager spilleren
const spiller = {
    x: 50,
    y: 640,
    width: 30,
    height: 30,
    speed: 5,
    dx: 0, 
    dy: 0,
    gravity: 0.5,
    jumpPower: -7.94, 
    onGround: false,
    color: "blue", 
}

function tegneSpiller() {
    ctx.fillStyle = spiller.color;
    ctx.fillRect(spiller.x, spiller.y, spiller.width, spiller.height) 
}

ctx.lineWidth = 10

// Plattformobjekter
const plattformer = [
    { x1: 400, y1: 544, x2: 800, y2: 544, color: "purple" }, //STØRRE PLATFORMER
    { x1: 0, y1: 438, x2: 400, y2: 438, color: "purple" },
    { x1: 400, y1: 332, x2: 800, y2: 332, color: "purple" },
    { x1: 0, y1: 226, x2: 400, y2: 226, color: "purple" },
    { x1: 400, y1: 120, x2: 800, y2: 120, color: "purple" },
    { x1: 0, y1: 75, x2: 270, y2: 75, color: "green" }, // Den siste
    { x1: 310, y1: 597, x2: 370, y2: 597, color: "aqua" }, //MINDRE PLATFORMER
    { x1: 430, y1: 499, x2: 490, y2: 499, color: "aqua" },
    { x1: 310, y1: 375, x2: 370, y2: 375, color: "aqua" },
    { x1: 430, y1: 269, x2: 490, y2: 269, color: "aqua" },
    { x1: 310, y1: 163, x2: 370, y2: 163, color: "aqua" },
    { x1: 300, y1: 55, x2: 360, y2: 55, color: "aqua" },
]

function tegnLinje(platform) {
    ctx.strokeStyle = platform.color
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(platform.x1, platform.y1)
    ctx.lineTo(platform.x2, platform.y2)
    ctx.stroke()
}

function kollisjonMedPlattform() {
    spiller.onGround = false

    if (spiller.y + spiller.height >= canvas.height) {
        spiller.onGround = true
        spiller.dy = 0
        spiller.y = canvas.height - spiller.height
    }

    plattformer.forEach(function(platform) {
        // Lander på en platform:
        if (
            spiller.y + spiller.height >= platform.y1 - 5 &&
            spiller.y + spiller.height <= platform.y1 + 5 &&
            spiller.x + spiller.width > platform.x1 &&
            spiller.x < platform.x2
        ) {
            spiller.onGround = true
            spiller.dy = 0
            spiller.y = platform.y1 - spiller.height -5
        }

        // Kollisjon "med hode" (hopper nedenfra) :
        if (
            spiller.y >= platform.y1 - 5 &&
            spiller.y <= platform.y1 + 5 &&
            spiller.x + spiller.width > platform.x1 &&
            spiller.x < platform.x2
        ) {
            spiller.dy *= -1
            spiller.y += 5
        }
        if (
            spiller.y <= 0
        ) {
            spiller.dy *= -1
            spiller.y += 5
        }
    })
}


function holderKeys(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        spiller.dx = spiller.speed 
        runSound.play()
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        spiller.dx = -spiller.speed
        runSound.play()
    } else if (event.key === "ArrowUp" || event.key === "w" ) {
        if (spiller.onGround) {
            spiller.dy = spiller.jumpPower
            spiller.onGround = false
            jumpSound.play()
        }
    }
}

function sluppetKey(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "d" || event.key === "a") {
        spiller.dx = 0;  
        runSound.pause()
        runSound.currentTime = 0;
    }
}

function update() {
    spiller.x += spiller.dx
    spiller.y += spiller.dy

    if (spiller.y + spiller.height < canvas.height) {
        spiller.dy += spiller.gravity
    } else {
        spiller.dy = 0
        spiller.y = canvas.height - spiller.height
        spiller.onGround = true
    }

    kollisjonMedPlattform()

    if (spiller.x < 0) spiller.x = 0
    if (spiller.x + spiller.width > canvas.width) spiller.x = canvas.width - spiller.width

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    plattformer.forEach(tegnLinje)
    tegneSpiller()

    requestAnimationFrame(update);
}

window.addEventListener("keydown", holderKeys);
window.addEventListener("keyup", sluppetKey);
update();
