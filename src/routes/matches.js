const { connect, get } = require('../db')

const { ObjectId } = require('mongodb')
/**
 * @param users - A list of users in the database
 */
let users = []

get({ name: 'users', query: { 'dob.age': { $lt: 32 } } }, (data) => {
	users = data
})

const matches = async (req, res) => {
	const user = req.session.user

	if (user === undefined) {
		res.redirect('/')
		return
	}

	const matches = []
	// let signedInUser

	await users
		.findOne({ 'login.username': user })
		.then((sessionUser) => {
			// signedInUser = sessionUser
			return sessionUser
		})
		.then((sessionUser) => {
			const matches = []
			console.log(sessionUser.matches)
			sessionUser.matches.forEach((match) => {
				users.findOne({ _id: ObjectId(match._id) }).then((user) => {
					matches.push(user)
					console.log(user)
				})
			})
		})
		.then((sessionUser, matches) => {
			res.status(200).render('matches.hbs', {
				user: sessionUser,
				users: matches,
			})
		})
}

module.exports = matches
