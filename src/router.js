const router = require('express').Router()

const { getIndex, postIndex } = require('./routes/index')
const { getLogin, postLogin } = require('./routes/login')
const { getMatch, postMatch } = require('./routes/match')
const { getMatches } = require('./routes/matches')
const { getProfile, postProfile } = require('./routes/profile')
const { logout } = require('./routes/logout')
const { getChat } = require('./routes/chat')

function validateSession(req, res, next) {
	if (req.session.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

router
	.get('/', validateSession, getIndex)
	.post('/', postIndex)
	.get('/profile', validateSession, getProfile)
	.post('/profile', postProfile)
	.get('/login', getLogin)
	.post('/login', postLogin)
	.get('/match/*', validateSession, getMatch)
	.get('/matches/', validateSession, getMatches)
	.post('/match/:userId/', validateSession, postMatch)
	.get('/logout', logout)
	.post('/logout', logout)
	.get('/chat', getChat)
	.get('/chat/:userId', validateSession, getChat)

module.exports = router
