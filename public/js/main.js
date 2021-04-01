const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')


const socket = io()
socket.on('message', (message)=>{
	console.log(message)
	outputMessage(message)
	
	chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (event)=>{
	event.preventDefault()
	
	const msg = event.target.elements.msg.value
	
	socket.emit('chatMessage', msg);
	
	//console.log(msg)
	
	event.target.elements.msg.value = ''
	event.target.elements.msg.focus();
})

function outputMessage(message){
	const div = document.createElement('div')
	div.classList.add('message');
	div.innerHTML = `
	<p class="meta">${message.username} : <span>${message.time}</span></p>
	<p class="text">${message.text}</p>
	`
	document.querySelector('.chat-messages').appendChild(div)
}
