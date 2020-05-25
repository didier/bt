/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 * @description Serves compiled template files to localhost.
 */

// Packages
const fs = require('fs')
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
// hbs.registerPartials(`${__dirname}/views/partials`)

let users = []
fs.readFile('./src/data/users.json', (err, data) => {
	if (err) {
		throw err
	}
	users = JSON.parse(data)
})

/**
 * Defines the port on which the server is hosted.
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = process.env.PORT || 3000

app
	// Serve static files in `/public`
	.use(express.static('public'))

	// Register `hbs.engine` with the Express app.
	.engine('hbs', hbs({ extname: 'hbs' }))

	// Set the Express view engine to handlebars
	.set('view engine', 'hbs')

	// Set the Views directory to `src/views`
	.set('views', 'src/views')

	.get('/matches', (req, res) => {
		res.render('matches.hbs', {
			users,
		})
	})

// Application running on port...
const server = app.listen(port, () => {
	console.log(`Miit is running in ${process.env.NODE_ENV} mode on http://localhost:${port + 1}`)
	process.send && process.send('online')
})

const io = require('socket.io')(server)

/** Defines the routes that will be served up by the server. */
const routes = {
	'/': 'index.hbs',
	'*': '404.hbs',
}

// Loop over and destructure the routes object, keepin' it DRY
for (const [route, source] of Object.entries(routes)) {
	app.get(route, (req, res) => {
		res.render(`${source}`)
	})
}

io.on('connection', (socket) => {
	// console.log(socket)
	console.log('a user connected')

	io.emit('user connected', {
		message: 'A new user has connected!',
	})

	io.on('disconnect', (socket) => {
		console.log('a user has disconnected.')
	})
})

io.on('user connected', (data) => {
	console.log(data)
})
