document.addEventListener(
	'touchmove',
	(event) => {
		event.scale = 0
		if (event.scale !== 1) {
			event.preventDefault()
			alert('Zooming was prevented!')
		}
	},
	false
)
