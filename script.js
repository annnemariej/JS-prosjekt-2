const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.width=600
canvas.height=450
document.body.appendChild(canvas)

///Lager Spileren 


const spiller = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    speed: 5,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    onGround: false
  };