const { get } = require('../db')
/**
 * @param users - A list of users in the database
 */
let users = []

get({ name: 'users', query: { 'dob.age': { $lt: 32 } } }, (data) => {
	users = data
})

const signIn = (req, res) => {
	try {
		const user = req.body.username
		if (!user) {
			res.redirect('/')
		}
		req.session.user = user
		users.findOne({ 'login.username': user }).then((sessionUser) => {
			req.session.userId = sessionUser._id
			// console.log(req.session)
			// console.log(sessionUser._id)
		})
		// req.session.save(() => console.log('session saved!'))
		res.redirect('/matches')
	} catch (error) {
		console.error(error)
	}
}

module.exports = signIn
