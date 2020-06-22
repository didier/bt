const { Read } = require('../db')
const bcrypt = require('bcrypt')
const { genders } = require('./profile')
const { ObjectId } = require('mongodb')
const getLogin = async (req, res) => {

	const users = await Read({
		collection: 'users',
		query: {}
	})

	res.status(200).render('login', {
		title: 'Log In to Miit',
		users,
	})
}

const postLogin = async (req, res) => {
	const data = req.body
	console.log(data)
	const results = await Read({
		collection: 'users',
		query: {
			_id: ObjectId(data.user)
		},
	})

	console.log(results)

	req.session.user = { ...results[0] }

	if (process.env.NODE_ENV === 'debug') {
		console.log('Session-data:')
		console.log(req.session.user)
	}

	if (results.length === 0) {
		res.redirect('/login')
		return
	}
	res.status(301).redirect('/')

	// // bcrypt.compare(data.pass, results[0].pass, (err, result) => {
	// if (process.env.NODE_ENV === 'debug') {
	// 	console.log('Results:', result)
	// }

	// if (req.session.user) {
	// } else {
	// 	res.status(401).redirect('/login')
	// }
	// // })
}

module.exports = { getLogin, postLogin }
