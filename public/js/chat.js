// Client side chat functionality
const socket = io()

socket.on('connect', () => {

	// Register DOM elements as variables
	const form = document.querySelector('.chat-form')
	const messageInput = document.querySelector('#message')

	const roomId = form.querySelector('#room-id').value
	const userId = form.querySelector('#user-id').value

	const typeIndicator = document.querySelector('.type-indicator')
	const statusIndicator = document.querySelector('.status-indicator')

	// Join keyed room
	console.log('CLIENT roomId:', roomId)
	socket.emit('joined', roomId)

	socket.on('user online', ({ status }) => {
		console.log('user online detected!')
		status === true
			? statusIndicator.classList.add('active')
			: statusIndicator.classList.remove('active')
	}

	)

	// Listen for submit events
	form.addEventListener('submit', event => {
		// Prevent refresh when the form is submitted
		event.preventDefault()

		// Gets the value of the message field, if it's empty don't submit.
		const message = messageInput.value
		if (messageInput.value === '') return

		// Send message to the server
		socket.emit('new message', { userId, message, roomId })

		// Render the new chat message to the DOM
		renderChat('sent', message)

		// Clear out the form
		form.reset()
	})

	// Handles new incoming messages
	socket.on('new message', (data) => {
		// Destructure message from data.message
		const { message } = data

		// Render chat to the DOM
		renderChat('received', message)
	})

	// Send typing events
	form.addEventListener('input', event => {
		event.preventDefault()

		// Check if user is deleting text
		if (event.inputType.includes('delete')) {
			return
		}

		// Check if text is empty, send typing event
		if (event.target.value !== '') {
			console.log('typing...')
			socket.emit('user typing')
		}
	})



	// Recieve type events
	socket.on('user typing', (message) => {
		console.log('participant is typing')

		if (typeIndicator.classList.contains('active')) {

		} else {
			typeIndicator.classList.add('active')
			setTimeout(() => {
				typeIndicator.classList.remove('active')
			}, 2000);
		}
	})



	function renderChat(method, message) {
		const chatWindow = document.querySelector('.chat-window')

		const newMessage = document.createElement('div')
		newMessage.classList.add('chat-message')
		newMessage.classList.add(method)
		newMessage.innerHTML = `<p>${message.toString()}</p>`

		if (method === 'receive') {
			typeIndicator.classList.remove('active')
			typeIndicator.addEventListener('transitionend', () => {
				chatWindow.appendChild(newMessage)
				newMessage.classList.add('active')
			})
		} else {
			typeIndicator.classList.remove('active')
			chatWindow.appendChild(newMessage)
			setTimeout(() => {
				newMessage.classList.add('active')
			}, 10)

		}

		setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 200)
	}
})


