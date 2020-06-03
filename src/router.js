const router = require('express').Router()
const index = require('./routes/index'),
	matches = require('./routes/matches'),
	chat = require('./routes/chat')

router
	.get('/', index)
	.get('/matches', matches)
	.get('/chat/:id', chat)
	.get('/chat', (req, res) => res.redirect('/matches'))
	.get('*', (req, res) => res.status(404).render('404.hbs'))

module.exports = router
