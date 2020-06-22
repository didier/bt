const { Read, Update } = require('../db')
const { ObjectId } = require('mongodb')

const getMatches = async (req, res, next) => {
	const sessionUser = req.session.user
	// Haal gelikede users op die mij ook geliked hebben

	const sessionUserId = sessionUser._id

	// die kijkt of mijn userId in hun liked array zit
	const query = {
		liked: sessionUserId,
	}

	// Lijst van mensen die mij geliked hebben
	const users = await Read({
		collection: 'users',
		query,
	})

	// Voor alle users die mij geliked hebben, kijk of ik hen ook heb geliked
	const matches = users.filter((user) => {
		const usersILike = sessionUser.liked

		// Return een string van het user ID
		const id = ObjectId(user._id).toString()

		// Returned true als de userId in de usersILike zit.
		const match = usersILike.includes(id)

		// Plaats item in matches array wanneer het true is
		return match
	})

	res.status(200).render('matches', {
		users: matches,
		user: sessionUser,
		title: 'Home',
	})
}

module.exports = { getMatches }
