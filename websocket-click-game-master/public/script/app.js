const socket = io();

const startingSection = document.querySelector('.starting-section')
const homeBtn = document.querySelector('.home-btn')

let catchButton = document.getElementById('catchButton')

startButton.addEventListener('click', () => {
    console.log('yeehe')
    socket.emit('startGame')
})

socket.on('server start game', () => {
    console.log('start game!!!')
    hideElements()
})

function hideElements() {
    startButton.style.display = 'none'
    catchButton.style.display = 'block'
    startingSection.style.display = 'none'
}

catchButton.addEventListener('click', () => {
    socket.emit('catchIsClicked', {
        offsetLeft: Math.random() * ((window.innerWidth - catchButton.clientWidth) - 100),
        offsetTop: Math.random() * ((window.innerHeight - catchButton.clientHeight) - 50)
    })
})

socket.on('server sending coordinates', data => {
    setRandomPosition(data.offsetLeft, data.offsetTop)
})

function setRandomPosition(left, top) {
    catchButton.style.top = top + 'px'
    catchButton.style.left = left + 'px'
    catchButton.style.animation = 'none'
}
