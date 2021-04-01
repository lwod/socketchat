const path = require('path')


const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT
app.use(express.static(path.join(__dirname, 'public')))


const http = require('http')
const server = http.createServer(app)


const socketio = require('socket.io')
const io = socketio(server)

const formatMessage = require('./utils/messages')

const botName = 'socketchat'

io.on('connection', socket => {
	console.log('new ws connection...')
	
	socket.emit('message', formatMessage(botName,'user at chat'));
	
	//for all expect emitter
	socket.broadcast.emit('message', formatMessage(botName,  'user joins for chat'));
	
	socket.on('disconnect', ()=>{
		io.emit('message', formatMessage(botName,'user left') )
	})
	
	socket.on('chatMessage', (msg)=>{
		//console.log(msg)
		io.emit('message', formatMessage('USER',msg))
	})
	
	//for  all
	//io.emit();
	
})

server.listen(PORT, ()=>{
	console.log('server run with socket: ', PORT)
})