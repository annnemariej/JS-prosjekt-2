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
canvas.width = 800
canvas.height = 650

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
const hopper0 = { x1: 310, y1: 597, x2: 370, y2: 597, color: "red" } //NEDERST width = 60  y=53 mindre enn platfprm x = x2 på den neste minus 90

const hopper1 = { x1: 430, y1: 499, x2: 490, y2: 499, color: "red" }
const platform1=  { x1: 400, y1: 544, x2: 800, y2: 544, color: "purple" }

const hopper2={ x1: 310, y1: 375, x2: 370, y2: 375, color: "red" }
const platform2 = {  x1: 0, y1: 438, x2: 400, y2: 438, color: "purple"  }

const hopper3= {  x1: 430, y1: 269, x2: 490, y2: 269, color: "red"  }
const platform3 = {  x1: 400, y1: 332, x2: 800, y2: 332, color: "purple"  }

const hopper4={  x1: 310, y1: 163, x2: 370, y2: 163, color: "red"  }
const platform4 = {  x1: 0, y1: 226, x2: 400, y2: 226, color: "purple"  }

const hopper5={  x1: 300, y1: 55, x2: 360, y2: 55, color: "red"  }
const platform5 = { x1:400, y1: 120, x2: 800, y2: 120, color: "purple" } 


const platform6 = { x1: 0, y1: 75, x2: 270, y2: 75, color: "green" } //Der prinsissen og donkey er

// Tegner en plattform
function tegnLinje(platform) {
    ctx.strokeStyle = platform.color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(platform.x1, platform.y1);
    ctx.lineTo(platform.x2, platform.y2);
    ctx.stroke();
}

tegnLinje(platform1)
tegnLinje(platform2)
tegnLinje(platform3)
tegnLinje(platform4)
tegnLinje(platform5)
tegnLinje(platform6)
tegnLinje(hopper0)
tegnLinje(hopper1)
tegnLinje(hopper2)
tegnLinje(hopper3)
tegnLinje(hopper4)
tegnLinje(hopper5)


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
    tegnLinje(platform1)
    tegnLinje(platform2)
    tegnLinje(platform3)
    tegnLinje(platform4)
    tegnLinje(platform5)
    tegnLinje(platform6)
    tegnLinje(hopper0)
    tegnLinje(hopper1)
    tegnLinje(hopper2)
    tegnLinje(hopper3)
    tegnLinje(hopper4)
    tegnLinje(hopper5)


    // Tegn spilleren
    tegneSpiller()

    // Kall update-funksjonen på nytt
    requestAnimationFrame(update)
}

// Hendelseslyttere for tastetrykk
window.addEventListener("keydown", holderKeys)
window.addEventListener("keyup", sluppetKey)

update();

