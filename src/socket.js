const app = require('../index')
const io = require('socket.io')(app)

io.on('connection', (socket) => {
	console.log('hi')
	socket.on('chat message', (message) => {
		socket.broadcast.emit('chat message', message)
	})

	socket.on('user typing', () => {
		socket.broadcast.emit('user typing')
	})
})
