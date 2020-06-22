
const { Update, Read } = require('../db')
const { ObjectId } = require('mongodb')

const genders = [
	{ gender: 'f', label: 'Female' },
	{ gender: 'm', label: 'Male' },
	{ gender: 'x', label: 'Prefer not to say / Non-binary' }
]
// Dit laat de data van de ingelogde user zien op de profile page
async function getProfile(req, res, next) {
	const sessionUser = req.session.user
	const query = { _id: ObjectId(sessionUser._id) }

	const user = await Read({
		collection: 'users',
		query,
		amount: 1
	})
	res.status(200).render('profile', {
		user: user[0],
		genders
	})
}

// Wanneer je een input veld aanpast en op save klikt wordt de data in de database aangepast
const postProfile = async (req, res) => {
	const body = req.body
	const sessionUser = req.session.user
	const query = { _id: ObjectId(sessionUser._id) }

	try {
		await Update({
			collection: 'users',
			query,
			data: { $set: { ...body } },
			single: true
		})
	} catch (error) {
		throw new Error(error)
	} finally {
		await res.redirect('/profile')
	}

}

module.exports = { getProfile, postProfile, genders }
