const { Read } = require('../db')
const { ObjectId } = require('mongodb')

const getIndex = async (req, res) => {
	const user = req.session.user

	console.log(user);

	const query = {
		_id: {
			$ne: ObjectId(user._id),
		},
	}

	res.cookie('user', user)

	const users = await Read({
		collection: 'users',
		query
	})

	res.status(200).render('index', {
		users,
		user: user,
		title: 'Home',
	})
}

const postIndex = async (req, res) => {
	if (!req.body) {
		res.redirect('/')
		return
	}

	const user = req.session.user
	const userId = req.body.user
	const query = {
		_id: {
			$ne: ObjectId(userId),
		},
	}

	const users = await Read({
		collection: 'users',
		query,
	})

	res.status(200).render('index', {
		users,
		user,
	})
}

module.exports = { getIndex, postIndex }
