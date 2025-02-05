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
tegneSpiller()

ctx.lineWidth = 10


//Tegner platformene
function tegnLinje(startx, starty, stoppx, stoppy, farge) {
    ctx.strokeStyle = farge
    ctx.beginPath()
    ctx.moveTo(startx, starty)
    ctx.lineTo(stoppx, stoppy)
    ctx.stroke()
}

tegnLinje(0, 200, 500, 350, "blue")
tegnLinje(600, 200, 450, 250, "green")

tegneSpiller()
