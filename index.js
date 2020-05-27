/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 * @description Serves compiled template files to localhost.
 */

// Packages
const express = require('express'),
	app = express(),
	hbs = require('express-handlebars')

require('dotenv').config()

const { DB_URI, DB_NAME, PORT } = process.env

const uri = DB_URI
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true })

/**
 * @param users - A list of users in the database
 */
let users = []
client.connect((err, client) => {
	if (err) {
		throw err
	}

	client
		.db(DB_NAME)
		.collection('users')
		.find()
		.limit(100)
		.toArray((err, docs) => {
			if (err) {
				throw err
			}
			users = docs
			client.close()
		})
})

/**
 * Defines the port on which the server is hosted.
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = PORT || 3000

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
		res.status(200).render('matches.hbs', {
			users,
		})
	})
	.get('/chat', (req, res) => {
		res.status(200).render('chat.hbs', {
			user: users[0],
		})
	})

// Application running on port...
const server = app.listen(port, () => {
	console.log(`Miit is running in ${process.env.NODE_ENV} mode on http://localhost:${port}`)
})

const io = require('socket.io')(server)

/** Defines the routes that will be served up by the server. */
const routes = require('./src/routes')

// Loop over and destructure the routes object, keepin' it DRY
for (const [route, source] of Object.entries(routes)) {
	app.get(route, (req, res) => {
		res.render(`${source}`)
	})
}

io.on('connection', (socket) => {
	socket.on('chat message', (message) => {
		socket.broadcast.emit('chat message', message)
	})

	socket.on('user typing', () => {
		socket.broadcast.emit('user typing')
	})
})
