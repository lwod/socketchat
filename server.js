const path = require('path')


const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT
app.use(express.static(path.join(__dirname, 'public')))


const http = require('http')
const server = http.createServer(app)


const socketio = require('socket.io')
const io = socketio(server)

io.on('connection', socket => {
	console.log('new ws connection...')
	
	socket.emit('message', 'to socketchat')
})

server.listen(PORT, ()=>{
	console.log('server run with socket: ', PORT)
})