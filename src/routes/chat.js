const { connect } = require('../db')

/**
 * @param users - A list of users in the database
 */
let users = []

connect({ name: 'users', query: { 'dob.age': { $lt: 32 } } }, (data) => {
	users = data
})

const chat = (req, res) => {
	const id = req.params.id
	const user = users.find((user) => user['_id'] === id)
	res.status(200).render('chat.hbs', {
		user,
	})
}

module.exports = chat
