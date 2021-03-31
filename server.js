const http = require('http')

const path = require('path')

const express = require('express');
const app = express();

const PORT = 3000 || process.env.PORT

const server = http.createServer(app)


app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT, ()=>{
	console.log('server run: ', PORT)
})