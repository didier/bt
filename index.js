/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 * @description Serves compiled template files to localhost.
 */

// Packages

require('dotenv').config()

const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const MongoClient = require('mongodb').MongoClient
const { PORT, DB_URI, DB_NAME } = process.env
const client = new MongoClient(DB_URI, { useUnifiedTopology: true })
const router = require('./src/router')

/**
 * Defines the port on which the server is hosted.
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = PORT || 3000

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
		.find({ dob: { age: { $lt: 30 } } })
		.limit(100)
		.toArray((err, docs) => {
			if (err) {
				throw err
			}
			users = docs
			client.close()
		})
})

app
	// Serve static files in `/public`
	.use(express.static('public'))
	// Register `hbs.engine` with the Express app.
	.engine('hbs', hbs({ extname: 'hbs' }))

	// Set the Express view engine to handlebars
	.set('view engine', 'hbs')

	// Set the Views directory to `src/views`
	.set('views', 'src/views')

	// Hook up live reload to the Gulp instance
	.use(require('connect-livereload')({ port: 35729 }))

	// Static Routes
	.use(router)
	.get('/chat', (req, res) => {
		res.status(200).render('chat.hbs', {
			user: users[0],
		})
	})
	.get('/chat/:user', (req, res) => {
		res.status(200).render('chat.hbs', {
			user: users[0],
		})
	})
	.get('*', (req, res) => {
		res.status(404).render('404.hbs')
	})

// Application running on port...
const server = app.listen(port, () => {
	console.log(`Miit is running in ${process.env.NODE_ENV} mode on http://localhost:${port}`)
})

const io = require('socket.io')(server)

io.on('connection', (socket) => {
	socket.on('chat message', (message) => {
		socket.broadcast.emit('chat message', message)
	})

	socket.on('user typing', () => {
		socket.broadcast.emit('user typing')
	})
})
