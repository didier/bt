const router = require('express').Router()

const index = require('./routes/index'),
	matches = require('./routes/matches')
// })
// console.log(routes)
// routes

router.get('/', index).get('/matches', matches) // give error on any route that has not been defined

module.exports = router
