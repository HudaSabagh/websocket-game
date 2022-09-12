const path = require('path')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

// we will set our path to serve our HTML through the public folder that we created
const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3001

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// use middleware
app.use(express.static(publicPath))

io.on('connection', socket => {
    console.log('A user connected')
    socket.on('disconnect', () => console.log('A user disconnected'))

    // other socket listeners, or emit() events
    socket.on('startGame', () => {
        io.emit('server start game')
    })

    socket.on('catchIsClicked', data => {
        io.emit('server sending coordinates', data)
    })
})

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})