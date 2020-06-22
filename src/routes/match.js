const { Read, Update } = require('../db')
const { ObjectId } = require('mongodb')
const getMatch = async (req, res, next) => {
	res.status(301).redirect('/')
}

const postMatch = async (req, res, next) => {
	const sessionUserId = req.session.user._id
	const isLiked = req.body.like // true of false
	const userId = req.params.userId

	// console.log('sessionUserId', sessionUserId)
	// console.log('isLiked', isLiked)
	// console.log('userId', userId)

	const query = { _id: ObjectId(sessionUserId) }

	if (isLiked === 'false') {
		// Add user to disliked
		try {
			await Update({
				collection: 'users',
				query,
				data: {
					$push: { disliked: userId },
				},
				single: true,
			})
		} catch (error) {
			console.error(error)
		} finally {
			if (process.env.NODE_ENV === 'debug') {
				const user = await Read({
					collection: 'users',
					query,
				})

				console.log(user)
			}
		}
	} else {
		// Add user to liked
		try {
			await Update({
				collection: 'users',
				query,
				data: {
					$push: { liked: userId },
				},
				single: true,
			})
		} catch (error) {
			console.error(error)
		} finally {
			if (process.env.NODE_ENV === 'debug') {
				const user = await Read({
					collection: 'users',
					query,
				})
				console.log(user)
			}
		}
	}

	res.status(301).redirect('/')
}

module.exports = { getMatch, postMatch }
