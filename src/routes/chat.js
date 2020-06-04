const { connect, get, mongo } = require('../db')
const { ObjectId } = require('mongodb')
const { DB_NAME } = process.env
/**
 * @param users - A list of users in the database
 */

let users

get({ name: 'users' }, (data, client) => {
	users = data
	console.log()
})

const chat = async (req, res, next) => {
	const id = req.params.id

	try {
		users
			.findOne({ _id: ObjectId(id) })
			.then((data) => {
				res.status(200).render('chat.hbs', {
					user: data,
				})
			})
			.catch((error) => console.error(error))
	} catch (error) {
		console.error('Caught error:', error)
		next(error)
	}
}

module.exports = chat
