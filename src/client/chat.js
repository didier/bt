const socket = io()

console.log('Hey!')

window.addEventListener('load', () => {
	const currentMessage = ''

	const form = document.querySelector('.chat-form')
	const messageInput = form.querySelector('#message')
	const typeIndicator = document.querySelector('.type-indicator')
	const statusIndicator = document.querySelector('.status-indicator')

	submit()
	type()
	status()

	function submit() {
		form.addEventListener('submit', (event) => {
			event.preventDefault()
			const message = messageInput.value
			if (message === '') {
				return
			}

			socket.emit('chat message', message)

			renderChat('send', message)
			form.reset()
		})

		socket.emit('user connected')

		socket.on('chat message', (message) => {
			renderChat('receive', message)
		})

		socket.on('user typing', (message) => {
			if (!document.querySelector('.typing')) {
				typeIndicator.classList.add('active')
				setTimeout(() => {
					typeIndicator.classList.remove('active')
				}, 2000)
			} else {
				typeIndicator.classList.remove('active')
			}
		})
	}

	function type() {
		form.addEventListener('input', (event) => {
			event.preventDefault()

			if (event.inputType.includes('delete')) {
				return
			}
			if (event.target.value !== '') {
				socket.emit('user typing')
			}
		})
	}

	function renderChat(method, message) {
		const chatWindow = document.querySelector('.chat-window')

		const newMessage = document.createElement('div')
		newMessage.classList.add('chat-message')
		newMessage.classList.add(method)
		newMessage.innerHTML = `
	<p>${message.toString()}</p>
	`

		if (method === 'receive') {
			typeIndicator.classList.remove('active')
			typeIndicator.addEventListener('transitionend', () => {
				chatWindow.appendChild(newMessage)
				newMessage.classList.add('active')
			})
		} else {
			chatWindow.appendChild(newMessage)
			newMessage.classList.add('active')
		}
	}

	function status() {
		socket.on('user online', (status) =>
			status === true ? statusIndicator.classList.add('active') : statusIndicator.classList.remove('active')
		)
	}
})
