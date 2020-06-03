const { connect } = require('../db')

/**
 * @param users - A list of users in the database
 */
let users = []

connect({ name: 'users', query: { 'dob.age': { $lt: 32 } } }, (data) => {
	users = data
})

const matches = (req, res) => {
	res.status(200).render('matches.hbs', {
		users,
	})
}

module.exports = matches
