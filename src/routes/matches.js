const { db } = require('../db')

async function matches(req, res) {
	console.log(db)
	// await get({ collection: 'users' }).then(users => console.log(users)).catch(err => console.error(err))
	res.status(200).render('matches.hbs', {
		// users: users || [{}, {}],
	})
}

module.exports = matches
