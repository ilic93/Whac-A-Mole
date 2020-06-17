const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const score = document.querySelector('.score')
const countdown = document.querySelector('.countdown')
const startButton = document.querySelector('button')

let lastHole
let currentScore
let endgame
let secLeft
let timer

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length)
  const hole = holes[index]

  if(hole == lastHole) {return randomHole(holes)}

  lastHole = hole
  return hole
}

function jump() {
  const hole = randomHole(holes)
  const time = randomTime(500, 1000)

  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if(!endgame) jump()
  }, time)
}

function newGame() {
  currentScore = 0
  score.textContent = currentScore
  endgame = false
  startButton.setAttribute('disabled', 'true')
  secLeft = 10
  countdown.textContent = `Seconds left: ${secLeft}`
  jump()

  timer = setInterval(() => {
    secLeft--
    countdown.textContent = `Seconds left: ${secLeft}`
    if(secLeft == 0) clearInterval(timer)
  },1000)

  setTimeout(() => {
    endgame = true
    startButton.removeAttribute('disabled')
  }, 10000)
}

function hit(e) {
  if(!e.isTrusted) return
  if(this.parentNode.classList.contains('up')) {
    currentScore++
    score.textContent = currentScore
  }
  this.parentNode.classList.remove('up')
}

moles.forEach(mole => mole.addEventListener('click', hit))
