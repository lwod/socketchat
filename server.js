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
	
	socket.emit('message', 'user at chat');
	
	//for all expect emitter
	socket.broadcast.emit('message', 'user joins for chat');
	
	socket.on('disconnect', ()=>{
		io.emit('message', 'user left')
	})
	
	socket.on('chatMessage', (msg)=>{
		//console.log(msg)
		io.emit('message', msg)
	})
	
	//for  all
	//io.emit();
	
})

server.listen(PORT, ()=>{
	console.log('server run with socket: ', PORT)
})