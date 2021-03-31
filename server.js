const socketio = require('socket.io')

const http = require('http')

const path = require('path')

const express = require('express');

const PORT = 3000 || process.env.PORT

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))


io.on('connection', socket => {
	console.log('new ws connection...')
})

server.listen(PORT, ()=>{
	console.log('server run with socket: ', PORT)
})