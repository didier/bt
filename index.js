/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 * @description Serves compiled template files to localhost.
 */

require('dotenv').config()

// Packages
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const router = require('./src/router')

/**
 * Defines the port on which the server is hosted.
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = process.env.PORT || 3000
const session = expressSession({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		// secure: true
	},
})

app
	.use(express.static('public')) // Serve static files in `/public`
	.use(cookieParser())
	.use(session)
	.use(express.urlencoded({ extended: true })) // Parse HTTP body
	.engine('hbs', hbs({ extname: 'hbs' })) // Register `hbs.engine` with the Express app.
	.set('view engine', 'hbs') // Set the Express view engine to handlebars
	.set('views', 'src/views') // Set the Views directory to `src/views`
	.use(require('connect-livereload')({ port: 35729 })) // Hook up live reload to the Gulp instance
	.use(router) // Use router.js for static and dynamic routes

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

module.exports = app
