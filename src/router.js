const router = require('express').Router()
const index = require('./routes/index'),
	matches = require('./routes/matches'),
	chat = require('./routes/chat'),
	signIn = require('./routes/signIn')

router
	.get('/', index)
	.post('/sign-in', signIn)
	.get('/matches', matches)
	.post('/chat/:id', chat)
	.get('/chat', (req, res) => res.redirect('/matches'))
	.get('*', (req, res) => res.status(404).render('404.hbs'))

module.exports = router
